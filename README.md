# 📦 FeeCheckr
Fee Verification Panel for Clerks, HODs, and Admins

FeeCheckr is the verification dashboard used by institutional staff (Clerks, HODs, Admins/Superadmins) to review, approve, or reject student fee submissions.

Built with: React, react-hook-form, shadcn/ui, TailwindCSS, Zustand, Zod

Written in: TypeScript

Features:
- Role-based access for verification workflow
- Form-driven review interfaces
- Clean, modular UI components
- State persistence and validation handling

## Modules

- [Server](https://github.com/anmol-fzr/FeeCheckrer)
- [Admin Portal](https://github.com/anmol-fzr/FeeCheckr)
- [Server for Mails Only](https://github.com/anmol-fzr/FeeMailer)
- [Student Portal](https://github.com/anmol-fzr/FeeGiver)

## Installation

Use pnpm for dependencies

### pnpm

install pnpm with npm

```sh  
npm i -g pnpm@latest
```


```sh 
pnpm up
```

## Get Started

```sh
git clone https://github.com/anmol-fzr/react-app/ && cd react-app && pnpm up && npm run dev
```

## Libraries

Typesafe React app Configured with path alias

Routing - [React Router Dom](https://reactrouter.com/en/main).

Data Fetching - [Axios](https://axios-http.com/), [Tanstack Query](https://tanstack.com/query/latest)

Styling - [TailwindCSS](https://tailwindcss.com/)

Bundler - [Vite](https://vitejs.dev)

State Management - [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction), [Context](https://react.dev/reference/react/useContext)

Schema Validator - [Yup](https://github.com/jquense/yup)

Forms - [React Hook Form](https://react-hook-form.com/)


#### Features

- edit `src/schema/envSchema.ts` for env validation
