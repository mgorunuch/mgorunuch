const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const https = require('https');

const app = express();

const betterConnectClientID = process.env.BETTER_CONNECT_CLIENT_ID;
const betterConnectClientSecret = process.env.BETTER_CONNECT_CLIENT_SECRET;

const linkedInStates = {
  betterConnect: [],
};
const linkedInOauthCodes = {
  betterConnect: [],
};


//здесь наше приложение отдаёт статику
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.use((req, res, next) => {
  if (!req.connection.encrypted)
    res.redirect(`https://${req.header('host')}${req.url}`)
  else
    next()
})

//простой тест сервера
app.get('/ping', function (req, res) {
  return res.send('pong');
});

app.get('/h/oauth/linkedin/better-connect', function (req, res) {
  const scopes = ['r_ad_campaigns','r_ads','r_ads_leadgen_automation','r_ads_reporting','r_basicprofile','r_emailaddress','r_liteprofile','r_member_social','r_organization_social','rw_ad_campaigns','rw_ads','rw_company_admin','rw_dmp_segments','rw_organization_admin','rw_organization','w_member_social','w_organization_social','w_share'];

  const code = (Math.random().toString(36).slice(2))+(Math.random().toString(36).slice(2));

  const url = new URL('https://www.linkedin.com/oauth/v2/authorization');
  url.searchParams.append('response_type', 'code');
  url.searchParams.append('client_id', betterConnectClientID);
  url.searchParams.append('redirect_uri', 'https://mgorunuch.pro/h/oauth/linkedin/better-connect/callback');
  url.searchParams.append('state', code);
  url.searchParams.append('scope', scopes.join(' '));
  linkedInStates.betterConnect.push(code);

  res.redirect(url.href);
});

app.get('/h/oauth/linkedin/better-connect/callback', function (req, res) {
  let validCode = false;
  let accessCode = '';

  req.searchParams.forEach((v, k) => {
    switch (k) {
      case 'state':
        const newI = linkedInStates.betterConnect.filter((sv) => sv !== v);
        if (newI.length !== linkedInStates.betterConnect.length) {
          validCode = true;
          linkedInStates.betterConnect = newI;
        }
        break;
      case 'code':
        accessCode = v;
        break;
    }
  });

  https.request({
    host: 'www.linkedin.com',
    path: '/oauth/v2/accessToken',
    method: 'POST',
    headers: {
      'Content-Type': `application/x-www-form-urlencoded`,
    },
    searchParams: {
      grant_type: 'authorization_code',
      code: accessCode,
      redirect_uri: 'https://mgorunuch.pro/h/oauth/linkedin/better-connect/callback',
      client_secret: betterConnectClientSecret,
    },
  }, res1 => {
    let data1 = '';
    res1.on('data', (chunk) => {
      data1 += chunk;
    });

    res1.on('end', () => {
      const authData = JSON.parse(data);

      const accessToken = authData.access_token;

      const options = {
        host: 'api.linkedin.com',
        path: '/v2/me',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'cache-control': 'no-cache',
          'X-Restli-Protocol-Version': '2.0.0'
        },
      };

      const profileRequest = https.request(options, function(res2) {
        let data = '';
        res2.on('data', (chunk) => {
          data += chunk;
        });

        res2.on('end', () => {
          const profileData = JSON.parse(data);

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(profileData, null, 3));
        });
      });
      profileRequest.end();
    });
  });
});

//обслуживание html
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);
