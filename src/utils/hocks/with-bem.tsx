import React from 'react';
import {Bem} from "@igor-gerasimovich/bem-helper";

export interface WithBemProps {
  bem: Bem;
}

const map: Map<string, Bem> = new Map<string, Bem>();

export const withThemedBem = (baseClassName: string) => {
  if (!map.has(baseClassName)) {
    map.set(baseClassName, new Bem(baseClassName));
  }

  return <P extends WithBemProps>(
    Component: React.ComponentType<P>,
  ): React.FunctionComponent<Omit<P, 'bem'>> => {
    return (props: Omit<P, 'bem'>) => {
      return <Component {...props as P} bem={map.get(baseClassName)} />;
    };
  };
};
