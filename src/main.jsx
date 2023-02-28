import React from 'react';
import ReactDOM from 'react-dom/client';
import * as T from 'three';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import ErrorPage from './views/ErrorPage';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
]);

const client = new ApolloClient({
  uri: 'https://0k1rl3qq.api.sanity.io/v1/graphql/production/default',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>,
);

const scene = new T.Scene();
const camera = new T.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const renderer = new T.WebGLRenderer();
const clock = new T.Clock();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const shaderUniforms = {
  resolution: { value: new T.Vector2(window.innerWidth, window.innerHeight) },
  complexity: { value: 100 },
  time: { value: 0.0 },
};

const fluidShader = `
  uniform vec2 resolution;
  uniform float time;
  uniform int complexity;

  void main() {
    vec2 p = (2.0 * gl_FragCoord.xy - resolution) / max(resolution.x, resolution.y);
    for(int i=1; i<complexity;i++) {
      vec2 newp=p;
      float fi = float(i);
      newp.x += 1.0 / fi * sin(fi * p.y + 0.3 * fi + time) + 0.1;
      newp.y += 0.4 / fi * sin(fi * p.x + 0.3 * (fi + 10.0) + time) - 0.05;
      p = newp;
    }
    vec3 col=vec3(abs(sin(p.x + 0.1 * time)+0.4), abs(sin(p.y + time)), abs(cos(p.x + p.y + time)));
    gl_FragColor=vec4(0.78 * col + 0.3, 1.0);
  }

`;
const geometry = new T.PlaneGeometry(10, 10, 30, 30);
const material = new T.ShaderMaterial({
  fragmentShader: fluidShader,
  uniforms: shaderUniforms,
});
const plane = new T.Mesh(geometry, material);
scene.add(plane);

camera.position.z = 3;
const animate = () => {
  const time = clock.getElapsedTime();
  shaderUniforms.time.value = 0.05 * time;
  // shaderUniforms.complexity.value = Math.floor(
  //   Math.abs(Math.sin(0.01 * time)) * 100
  // );
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};
animate();
