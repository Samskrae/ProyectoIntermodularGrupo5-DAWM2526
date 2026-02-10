import { createBrowserRouter } from 'react-router';
import { Root } from '@/app/Root';
import { Home } from '@/app/pages/Home';
import { Ofertas } from '@/app/pages/Ofertas';
import { Tendencias } from '@/app/pages/Tendencias';
import { Empresa } from '@/app/pages/Empresa';
import { Auth } from '@/app/pages/Auth';
import { RegistroEmpresa } from '@/app/pages/RegistroEmpresa';
import { Perfil } from '@/app/pages/Perfil';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'ofertas', Component: Ofertas },
      { path: 'tendencias', Component: Tendencias },
      { path: 'empresa', Component: Empresa },
      { path: 'entrar', Component: Auth },
      { path: 'registro-empresa', Component: RegistroEmpresa },
      { path: 'perfil', Component: Perfil },
    ],
  },
]);