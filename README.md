# linkace-import-firefox

Import Firefox JSON bookmarks to [LinkAce](https://www.linkace.org/) self-hosted bookmark archive.

## Installation

Clone and run `npm i`.

## Usage

With LinkAce .env in current working directory:
```
node index.js bookmarks.json
```
Or:

```
node index.js --bookmarks=bookmarks.json
```

With path to LinkAce .env file:
```
node index.js --env=/path/to/.env bookmarks.json
```
Or:
```
node index.js --env=/path/to/.env --bookmarks=bookmarks.json
```

To start from specific URL:

```
node index.js bookmarks.json --from=https://example.com
```
