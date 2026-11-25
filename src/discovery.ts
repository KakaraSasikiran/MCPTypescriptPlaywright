import {Client} from '@modelcontextprotocol/client'
import {StdioClientTransport} from '@modelcontextprotocol/client/stdio'


const client = new Client({
    name:"Sasi-client",
    version:"1.0.0"
})

const transport = new StdioClientTransport({
    command:"npx",
    args:["-y","@playwright/mcp@latest"]
})

async function main(){
    await client.connect(transport)
    const result = await client.listTools()
    for(const cons of result.tools){
        console.log("Tool Name:",cons.name)
        console.log("Description:",cons.description)
    }
    const results = await client.listTools()
    const tool = results.tools.find(
        tool_one =>tool_one.name=="browser_navigate"
    )
    console.log("Results:",tool)
    const ones = await client.callTool({
        name:"browser_navigate",
        arguments:{
            "url":"https://www.google.com"
        }
    })
    console.log(ones)
    const twos = await client.callTool({
        name:'browser_snapshot',arguments:{}
    })
    await client.callTool({
        name:"browser_click",
        arguments:{
            "target":"e10"
        }
    })
    console.log("Twos",twos)
    await client.close()
}
main()