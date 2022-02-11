import { api } from './_shopifyApi.js';

export const post = async ({request}) => {
  let body = await request.json();

  const response = await api({
        query: `
        query GetCart($cartId: ID!) {
            cart(id: $cartId) {
            checkoutUrl
            estimatedCost {
                totalAmount {
                amount
                }
            }
            lines(first: 100) {
                edges {
                node {
                    quantity
                    estimatedCost {
                    subtotalAmount {
                        amount
                        currencyCode
                    }
                    totalAmount {
                        amount
                        currencyCode
                    }
                    }
                    merchandise {
                    ... on ProductVariant {
                        id
                        title
                        product {
                            images(first: 1) {
                                edges {
                                  node {
                                    originalSrc
                                    altText
                                    width
                                    height
                                  }
                                }
                              }
                            priceRange {
                                maxVariantPrice {
                                  amount
                                  currencyCode
                                }
                              }
                            title
                        }
                        priceV2 {
                        amount
                        currencyCode
                        }
                    }
                    }
                }
                }
            }
            }
        }
        `,
        variables: body,
    });
    return response;
};