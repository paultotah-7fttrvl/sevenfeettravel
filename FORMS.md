# Contact form setup

Form submissions previously used **FormSubmit**. Repeated tests returned **HTTP 522** (connection timeout) from FormSubmit’s servers, which is outside this static site’s DNS or hosting configuration.

The site now submits to **Web3Forms** from the visitor’s browser instead.

## One-time setup

1. Create a free access key at [https://web3forms.com](https://web3forms.com).
2. In `index.html`, find the hidden input `name="access_key"` inside the contact form.
3. Replace the placeholder value `ACCESS_KEY_ADD_FROM_WEB3FORMS_DASHBOARD` with your real access key.
4. In the Web3Forms dashboard, restrict **allowed domains** to `www.sevenfeettravel.com` (and optionally `localhost` for local testing).

After the key is set, the yellow configuration banner on the contact section hides automatically and the form sends JSON to `https://api.web3forms.com/submit`.

## Fallback

If someone cannot use the form, the contact section still lists **Instagram** and **email**.
