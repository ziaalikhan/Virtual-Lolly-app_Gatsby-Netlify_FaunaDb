

exports.createPages = async function ({ actions}) {
  actions.createPage({
      path: "my-dynamic",
      component: require.resolve(`./src/pages/dynamic.js`),
      context: { 
          // Data passed to context is available
          // in pageContext props of the template component
          name: "zia Ali Khan",
       },
  });
  console.log("End of Gatsby Node File");
}