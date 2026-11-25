import { Client } from "@modelcontextprotocol/client";
import {StdioClientTransport} from '@modelcontextprotocol/client/stdio'

async function main(){

    const client = new Client({
        name:"sasi-client",
        version:"1.0.0"
    })
    const response = new StdioClientTransport({
        command:"npx",
        args:["-y","@playwright/mcp@latest"]
    })
    try {
        await client.connect(response)
        const tools = await client.listTools()
        for(const t of tools.tools){
            console.log(`Description:${t.description} - Name:${t.name}`)
        }
        await client.callTool({
            name:"browser_navigate",
            arguments:{
                "url":"https://www.google.com"
            }
        })
       const snapshots=await client.callTool({
        name:"browser_snapshot",
        arguments:{}
       })
       console.log(snapshots)
       const navigate_tool = tools.tools.find(
        t=>t.name=="browser_navigate"
       )
       console.log("Results:",navigate_tool?.inputSchema)
       const browser_click = tools.tools.find(t=>t.name=="browser_click")
       console.log("Browser_Clicks:",browser_click?.inputSchema)
    } catch (error) {
        console.log("Error:",error)
        await client.close()
    }
}

main()