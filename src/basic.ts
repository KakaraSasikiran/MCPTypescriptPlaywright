import {Client} from '@modelcontextprotocol/client'
import {StdioClientTransport} from '@modelcontextprotocol/client/stdio'


const client = new Client({
    name:"sasi",
    version:"1.0.0"
})
const transport = new StdioClientTransport({
    command:"npx",
    args:["-y","@playwright/mcp@latest"]
})

async function main(){
    await client.connect(transport)
    console.log("Connected to playwright MCP Server")
    await client.close()
}

main()