# Erstattungsformular Medimeister Graz
Based on [webkom/kvittering](https://github.com/webkom/kvittering), configured to run as a normal docker container.

Handles refund requests for [mmgraz](https://medimeistergraz.org).

## Development

This is one docker image that serves both the Python API, and the Next.js/React frontend. This is done by building the webapp as a static site, and serving it as static files through flask. Be aware that some of the python imports does not support development in Windows.

To run just the frontend:

- Install all packages with `yarn`
- Start the server with `yarn dev`
- Export the static files with `yarn build && yarn export`

To run the backend/everything:

- Make a virtual env with `python -m venv venv`
- Enter the env with `source venv/bin/activate`
- Install packages with `pip install -r kaaf/req.txt`
- Start the server with `python kaaf/server.py`
- If the frontend is exported (`yarn export`), the webapp will be available at `localhost:5000` when running `server.py`

> One of the packages (pdf2image) will require poppler to work correctly with tmp files. Most linux distros come with this.
> For MacOS `brew install poppler`

### Generating PDFs

It might be nice to be able to quickly generate PDFs when developing, without having to start up everything. To do this you can run:

```python
python kaaf/generate-example.py signature.png output.pdf image0.png image1.png ...
```

Where `signature.png` and `imageN.png` are paths to image files (the latter images are optional)

## Environment variables

| Variable              | Function                                    |
| --------------------- | ------------------------------------------- |
| `MAIL_ADDRESS`        | Set the mail address for generated receipts |
| `SERVICE_ACCOUNT_STR` | Password for the mail account               |
| `ENVIRONMENT`         | Set to "production" for sentry errors       |
| `SENTRY_DSN`          | Ingest errors to sentry                     |
