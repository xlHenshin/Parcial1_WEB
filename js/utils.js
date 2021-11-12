const formatCurrency = (price) =>{
    return new Intl.NumberFormat( {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
    }).format(price);
};