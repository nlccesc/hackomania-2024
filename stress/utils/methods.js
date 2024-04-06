export async function handleAnalyse(text) {
    try {
        const response = await fetch("/api/meter",{
            method: 'POST',
            body: JSON.stringify({"text_corpus" : text})
        })

        const data = await response.json();
        console.log(data)
    } catch (error) {
        
    }
}