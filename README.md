# MTKruto Server

MTKruto Server is a server for running Telegram clients (whether they are bots or user accounts) with ability to interact with them remotely through its HTTP interface. Now inside a Docker container! 😀

## Documentation

The documentation for MTKruto Server resides [here](https://mtkru.to/server/).

> **Note:** Most of variables were moved to environment. 
> For now, the only available console flag is `--add-user`


## Running with Docker

```bash
docker run \
    -p 3000:3000 \
    -p 8000:8000 \
    -v /path/to/data:/app \
    -e API_ID=your_api_id \
    -e API_HASH=your_api_hash \
    ghcr.io/ilyahahaha/mtkruto-server:main
```
Mount a volume to `/app` to persist your data.
Also, you can provide all optional variables as environment variables.

## Contributing

Useful contributions of any kind is warmly accepted, so feel free to make pull requests!

## Support

Join [our chat](https://mtkruto.t.me) if you had any questions.

## Legal

MTKruto Server is released under the GNU Affero General Public License version 3, or at your option, any later version. Refer to [COPYING](./COPYING) for the full license text.
