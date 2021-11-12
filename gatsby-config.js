module.exports = {
    siteMetadata: {
        siteUrl: `https://www.yourdomain.tld`,
    },
    plugins: [
        {
            resolve: "gatsby-source-graphql",
            options: {        
              typeName: "GSG",        
              fieldName: "GetLollies",       
              url: "https://vriual-lolly-gatsby.netlify.app/.netlify/functions/LollyApp",
            },
          }    
    ]
}