import React from 'react';
import Strapi from 'strapi-sdk-javascript/build/main';
import {
  Box,
  Heading,
  Text,
  Image,
  Card,
  Button
 } from "gestalt";
 import { Link } from 'react-router-dom';

const apiUrl = process.env.API_URL || 'http://localhost:1337/';
const strapi = new Strapi(apiUrl);

export default class Brews extends React.Component {
  state = {
    brews: [],
    brand: ''
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
        brand: data.brand.name
      })
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { brand, brews } = this.state;
    return (
      <Box
        marginTop={4}
        display="flex"
        justifyContent="center"
        alignItems="start"
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
                        <Button color="blue" text="Add to cart" />
                      </Text>
                    </Box>
                  </Box>
                </Card>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    )
  }
}
