module.exports = {
    siteMetadata: {
        siteUrl: `https://www.yourdomain.tld`,
    },
    plugins: [
        {
            resolve: "gatsby-source-graphql",
            options: {
                typeName: "LOLLY",
                fieldName: "getLollies",
                url: `/.netlify/functions/LollyApp`,
            }
        },
    ]
}