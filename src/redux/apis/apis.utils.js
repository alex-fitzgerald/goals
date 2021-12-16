export const fetchApi = async (apiUrl) => {
    try {
        const stoicUrl = "https://stoicquotesapi.com/v1/api/quotes/random";
        const response = await fetch(stoicUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}