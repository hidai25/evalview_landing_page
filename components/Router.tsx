import React, { lazy, Suspense } from 'react';
import { useNavigation } from '../hooks/router';
import App from '../App';

const BlogIndex = lazy(() => import('../pages/BlogIndex'));
const BlogPost = lazy(() => import('../pages/BlogPost'));
const SeoPage = lazy(() => import('../pages/SeoPage'));

const LoadingScreen: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="flex items-center gap-3 text-slate-400">
      <img src="/logo.png" alt="EvalView" className="w-8 h-8 filter drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
      <span className="font-semibold text-white">EvalView</span>
    </div>
  </div>
);

const Router: React.FC = () => {
  const { path } = useNavigation();

  if (path === '/blog') {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <BlogIndex />
      </Suspense>
    );
  }

  if (path.startsWith('/blog/')) {
    const slug = path.slice(6).replace(/^\//, '');
    return (
      <Suspense fallback={<LoadingScreen />}>
        <BlogPost slug={slug} />
      </Suspense>
    );
  }

  if (
    path === '/vs/langsmith' ||
    path === '/vs/langfuse' ||
    path === '/vs/braintrust' ||
    path === '/vs/deepeval' ||
    path === '/ai-agent-testing-ci-cd'
  ) {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <SeoPage path={path} />
      </Suspense>
    );
  }

  return <App />;
};

export default Router;
