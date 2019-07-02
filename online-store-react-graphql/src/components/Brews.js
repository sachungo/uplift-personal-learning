import React from 'react';
import Strapi from 'strapi-sdk-javascript/build/main';
import {
  Box,
  Heading,
  Text,
  Image,
  Card,
  Button,
  Mask,
  IconButton
 } from "gestalt";
 import { Link } from 'react-router-dom';

 import { calculatePrice, setCart, getCart } from "../utils";

const apiUrl = process.env.API_URL || 'http://localhost:1337/';
const strapi = new Strapi(apiUrl);

export default class Brews extends React.Component {
  state = {
    brews: [],
    brand: '',
    cartItems: []
  };

  async componentDidMount() {
    try {
      const { brandId = '' } = this.props.match.params;
      const { data } = await strapi.request('POST', '/graphql', {
        data: {
          query: `query {
            brand(id: "${brandId}") {
              _id
              name
              brews {
                _id
                name
                description
                price
                image {
                  url
                }
              }
            }
          }`
        }
      });

      this.setState({
        brews: data.brand.brews,
        brand: data.brand.name,
        cartItems: getCart()
      })
    } catch (error) {
      console.error(error);
    }
  }

  addToCart = brew => {
    const { cartItems } = this.state;
    const alreadyInCart = cartItems.findIndex(
      item => item._id === brew._id
    );

    if (alreadyInCart === -1) { // if not in cart, add it together with quantity key
      const updatedItems = cartItems.concat({...brew, quantity: 1});
      this.setState(
        { cartItems: updatedItems },
        () => setCart(updatedItems)
      )
    } else { // if in cart increase quantity by one
      const updatedItems = [...cartItems];
      updatedItems[alreadyInCart].quantity +=1;
      this.setState(
        { cartItems: updatedItems },
        () => setCart(updatedItems)
      );
    }
  }

  deleteItemFromCart = (id) => {
    const filteredItems = this.state.cartItems
      .filter(item => item._id !== id);

    this.setState(
      { cartItems: filteredItems },
      () => setCart(filteredItems)
    );
  }

  render() {
    const { brand, brews, cartItems } = this.state;
    return (
      <Box
        marginTop={4}
        display="flex"
        justifyContent="center"
        alignItems="start"
        dangerouslySetInlineStyle={{
          __style: {
            flexWrap: 'wrap-reverse'
          }
        }}
      >
        {/* brews section */}
        <Box
          display="flex"
          direction="column"
          alignItems="center"
        >
          <Box margin={2}>
            <Heading color="orchid">{brand}</Heading>
          </Box>
          <Box
            dangerouslySetInlineStyle={{
              __style: {
                backgroundColor: '#bdcdd9'
              }
            }}
            shape="rounded"
            display="flex"
            justifyContent="center"
            padding={4}
            wrap
          >
            {brews.map(brew =>
              <Box
                key={brew._id}
                width={210}
                margin={2}
                padding={4}
              >
                <Card
                image={
                  <Box height={200} width={200}>
                    <Image
                      src={`${apiUrl}${brew.image.url}`}
                      alt="Brew"
                      naturalHeight={1}
                      naturalWidth={1}
                    />
                  </Box>
                }
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    direction="column"
                    width={200}
                  >
                    <Box marginBottom={2}>
                      <Text bold size="xl">{brew.name}</Text>
                    </Box>

                    <Text>{brew.description}</Text>
                    <Text>{brew.price}</Text>

                    <Box marginTop={2}>
                      <Text bold size="xl">
                        <Button
                          color="blue"
                          text="Add to cart"
                          onClick={() => this.addToCart(brew)}
                        />
                      </Text>
                    </Box>
                  </Box>
                </Card>
              </Box>
            )}
          </Box>
        </Box>

        {/* User cart */}
        <Box marginTop={2} marginLeft={8} alignSelf="end">
          <Mask shape="rounded" wash>
            <Box
              display="flex"
              direction="column"
              alignItems="center"
              padding={2}
            >
              <Heading align="center" size="sm">Your Cart</Heading>
              <Text color='gray' italic>
                {cartItems.length} items selected
              </Text>
              {/* Cart items */}

               {cartItems.map(item => (
                  <Box
                    key={item._id}
                    display="flex"
                    alignItems="center"
                  >
                    <Text>
                      {item.name} X {item.quantity} - ${(item.quantity * item.price).toFixed(2)}
                    </Text>
                    <IconButton
                      accessibilityLabel="Delete Item"
                      icon="cancel"
                      size="sm"
                      iconColor="red"
                      onClick={() => this.deleteItemFromCart(item._id)}
                    />
                  </Box>
               ))}
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                direction="column"
              >
                <Box margin={2}>
                  {cartItems.length === 0 && (
                    <Text color="red">
                      Pleae select some items
                    </Text>
                  )}
                </Box>
                <Text size="lg">Total: ${calculatePrice(cartItems)}</Text>
                <Text>
                  <Link to="/checkout">Checkout</Link>
                </Text>
              </Box>
            </Box>
          </Mask>
        </Box>
      </Box>
    )
  }
}
