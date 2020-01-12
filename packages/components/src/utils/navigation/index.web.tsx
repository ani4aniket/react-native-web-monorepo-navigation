import { useCallback } from 'react'

import { stringify } from 'query-string'
import { useHistory, useLocation, useParams } from 'react-router-dom'

import { NavigationParams, Route } from '../../models/router'

// Helper functions

const buildUrl = (pathname: string, params: NavigationParams<any>) => {
  const base = window.location.href;
  const url = new URL(pathname, base);

  const searchParams = new URLSearchParams(params);
  url.search = searchParams.toString();
  const newUrl = url.toString();

  const finalUrl = newUrl.replace(url.origin, "");

  return finalUrl;
};

// Hooks

const useNavigation = () => {
  const { push, goBack } = useHistory();

  const navigate = useCallback(
    (to: Route["path"], qsParams: Route["params"] = {}) => {
      const path = buildUrl(to, qsParams);
      push(path);
    },
    []
  );

  return {
    navigate,
    goBack
  };
};

const useRoute = () => {
  const { pathname } = useLocation();
  const params = useParams();

  const route: Route = {
    path: pathname,
    params
  };

  return route;
};

export { useNavigation, useRoute };
