export const useLink = (href: string, slash: boolean = true) => {
  const baseURL = import.meta.env.BASE_URL;
  const trimmedBaseURL = baseURL.endsWith("/") ? baseURL.slice(0, -1) : baseURL;
  const fullURL = `${trimmedBaseURL}${href.startsWith("/") ? href : "/" + href}`;
  const trailingURL = fullURL.endsWith("/") ? fullURL : fullURL + "/";
  if (!slash) {
    return trailingURL.slice(0, -1);
  }
  return trailingURL;
};