queries/products.ts

queryFn: (
  queryProps: QueryFunctionContext, // NOTE @isuvorov: добавил тип QueryFunctionContext
) => fetchProductList(params, { ...queryProps, ...options }),

getNextPageParam: (lastPage: any) => lastPage.nextCursor, // NOTE @isuvorov: В типе ProductListResponse должен присутстовать nextCursor
getPreviousPageParam: (firstPage: any) => firstPage.prevCursor, // NOTE @isuvorov: В типе ProductListResponse должен присутстовать prevCursor

pages/admin/* , pages/auth/* , pages/cabinet/*

<AdminLayout activeHref=""> {/* NOTE @isuvorov: лейауты можно по другому сделать */}
<AuthLayout> {/* NOTE @isuvorov: лейауты можно по другому сделать */}
<CabinetLayout> {/* NOTE @isuvorov: лейауты можно по другому сделать */}

pages/auth/index.tsx, pages/links/index.tsx

export default createRedirectPage({ redirectPath: '/auth/login' }); 

Некорректно создана страница редиректа. Нужно использовать redirects блок в next.config.mjs для такого типа страниц

Кажется pages/auth/logout.ts можно сделать не отдельным роутом - а просто функцией которую можно использовать по нажатию на кнопку выход. Не вижу причин зачем нужна данная страница

Кажется нужно поработать со структурой и неймингом. В одном месте у тебя папка queries - где по факту находятся хуки и функции для query из TanStack Query. А в другом месте (в rckit/auth/queries) у тебя fetch запросы в бэк. 

Не до конца понимаю концепт rckit папки