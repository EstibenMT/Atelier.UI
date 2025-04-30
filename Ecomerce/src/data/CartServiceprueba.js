

const url = "http://localhost:5209";
export async function AddProductToCart(cartId, productId, quantity, variantId ) {
    const fetchlink = url + "/api/cart";
    const payload = {
        shoppingCartId: cartId,
        productId: productId,
        quantity: quantity,
        variantId: variantId
    };

    const response = await fetch(fetchlink, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error('Error al enviar productos al servidor');
    }

    const data = await response.json();
    return data;
}

export async function getShoppingCart() {
    const fetchlink = url + "/api/shoppingCart/3e2w5yjbkk12zce4mkb3qghz";

    const response = await fetch(fetchlink, {
        method: "Get",
        headers: {
            "Content-Type": "application/json",
        }, 
    });

    if (!response.ok) {
        throw new Error('Error al enviar productos al servidor');
    }

    const data = await response.data();
    return data;
}