// PayPal JavaScript SDK client

export const initPayPalClient = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${import.meta.env.VITE_PAYPAL_CLIENT_ID}&vault=true&intent=subscription`;
    script.async = true;
    
    script.onload = () => resolve(window.paypal);
    script.onerror = () => reject(new Error('Failed to load PayPal JS SDK'));
    
    document.body.appendChild(script);
  });
};
