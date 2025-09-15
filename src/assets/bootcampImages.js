const U = (url) => `${url}?auto=format&fit=crop&w=1200&q=80`;

export const bootcampImagesByName = {
  "Java Developer": U("https://images.unsplash.com/photo-1515879218367-8466d910aaa4"), // code
  "Fullstack Jr":   U("https://images.unsplash.com/photo-1555066931-4365d14bab8c"), // laptop
  "Data Analytics": U("https://images.unsplash.com/photo-1517433456452-f9633a875f6f"), // data
};


export const fallbackBootcampImage = U("https://images.unsplash.com/photo-1555066931-4365d14bab8c");
