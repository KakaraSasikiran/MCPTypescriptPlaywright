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
    } catch (error) {
        console.log("Error:",error)
        await client.close()
    }
}

main()