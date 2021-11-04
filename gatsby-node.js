const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const lollyTemplate = path.resolve("./src/pages/dynamicLollyPage.js")

  const { data } = await graphql(`
    {
        Lolly {
          color1
          color2
          color3
          lollyPath
          resciever
          sender
          message
        }
    }
  `)

  data.Lolly.forEach( lolly => {
    createPage({
      component: lollyTemplate,
      path: `/lollies/${lolly.lollyPath}`,
      context: {
        lollyPath: lolly.lollyPath,
        color1: lolly.color1,
        color2: lolly.color2,
        color3: lolly.color3,
        resciever: lolly.resciever,
        sender: lolly.sender,
        message: lolly.message,
      },
    })
  })
}