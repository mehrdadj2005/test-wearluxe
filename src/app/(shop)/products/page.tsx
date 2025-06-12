interface IProducts {
    searchParams: Promise<{ title: string }>
}

async function ProductsPage({ searchParams }: IProducts) {
    const title = (await searchParams).title || "page"

    return (<div>products {title}</div>);
}

export default ProductsPage;