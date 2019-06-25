import React, { Component } from "react";
import {
  Container,
  Box,
  Heading,
  Card,
  Image,
  Text,
  SearchField,
  Icon
} from 'gestalt';
import { Link } from 'react-router-dom';
import Strapi from 'strapi-sdk-javascript/build/main';
import "./App.css";

const apiUrl = process.env.API_URL || 'http://localhost:1337/';
const strapi = new Strapi(apiUrl);

class App extends Component {
  state = {
    brands: [],
    searchTerm: ''
  };

  async componentDidMount() {
    try {
      const { data } = await strapi.request('POST', '/graphql', {
        data: {
          query: `query {
            brands {
              _id
              name
              description
              image {
                url
              }
            }
          }`
        }
      });

      this.setState({ brands: data.brands });
    } catch (error) {
      console.error(error);
    }
  }

  handleChange = ({ value }) => {
    this.setState({ searchTerm: value })
  }

  render() {
    const { brands, searchTerm } = this.state;
    return (
      <Container>
        {/* search field */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop={4}
          marginBottom={3}
        >
          <SearchField
            id="searchField"
            accessibilityLabel="Brand Search Field"
            onChange={this.handleChange}
            placeholder="Search Brands"
          />
          <Box margin={2}>
            <Icon
              icon="filter"
              color={searchTerm ? 'orange' : 'gray'}
              accessibilityLabel="Filter"
            />
          </Box>
        </Box>


        {/* brand section */}
        <Box
          display="flex"
          justifyContent="center"
          marginBottom={2}
        >
          {/* Brands header */}
          <Heading color="midnight" size="md">
            Brew Brands
          </Heading>
        </Box>

        <Box
          shape="rounded"
          dangerouslySetInlineStyle={{
            __style: {
              backgroundColor: "#d6c8ec"
            }
          }}
          display="flex"
          justifyContent="around"
          wrap
        >
          {brands.map(brand => (
            <Box
              key={brand._id}
              width={200}
              margin={2}
              padding={4}
            >
              <Card
               image={
                 <Box height={200} width={200}>
                  <Image
                    src={`${apiUrl}${brand.image.url}`}
                    alt="Brand"
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
                  <Text bold size="xl">{brand.name}</Text>
                  <Text>{brand.description}</Text>
                  <Text bold size="xl">
                    <Link to={`/${brand._id}`}>See Brews</Link>
                  </Text>
                </Box>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    );
  }
}

export default App;
