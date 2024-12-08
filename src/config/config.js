const origin = window.location.origin.includes("localhost")
    ? "https://self-declaration.salamatehr.ir"   //"https://dentistry.salamatehr.ir/EGW/" 
    : window.location.origin.toString()
export const baseURL = `${origin}/EGW/`
