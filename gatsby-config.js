module.exports = {
    siteMetadata: {
        siteUrl: `https://www.yourdomain.tld`,
    },
    plugins: [
        `gatsby-plugin-material-ui`,
        {
            resolve: `gatsby-source-graphql`,
            options: {
              typeName: `GitHub`,
              fieldName: `github`,
              url: `https://api.github.com/graphql`,
              headers: {
                Authorization: `Bearer your-github-token`,
              },
            },
          },
         
    ]
}