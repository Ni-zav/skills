---
name: pixel-streaming-operator
description: Deploy and troubleshoot Unreal Engine Pixel Streaming across the frontend, signalling server, streamer connection, WebRTC ICE/media path, STUN/TURN, SFU, reverse proxy or Cloudflare Tunnel, custom domains, and mobile networks. Use when Pixel Streaming shows wss/signalling failures, works on LAN but not mobile data, has TURN/NAT problems, needs Cloudflare in front, requires one-player or multi-viewer topology, or when a health endpoint succeeds but the browser still cannot receive the Unreal stream.
---

# Pixel Streaming Operator

Debug each transport boundary separately. Pixel Streaming can have a healthy website while the actual stream path is broken.

## Connection ladder

Treat these as distinct layers:

1. browser → HTTP(S) frontend;
2. browser → signalling WebSocket;
3. Unreal streamer → signalling server;
4. browser ↔ Unreal WebRTC ICE negotiation;
5. media path over direct UDP/TCP or TURN relay;
6. optional SFU path for one-to-many delivery.

Prove each layer before changing the next.

## Workflow

1. Identify Unreal Engine version and the exact Pixel Streaming Infrastructure version/branch in use.
2. Record topology: host, public domain, reverse proxy/tunnel, signalling ports, streamer port, SFU port, STUN/TURN URLs, and firewall/NAT boundary.
3. Reproduce first on LAN, then from an external network such as mobile data. The difference is diagnostic evidence.
4. Check signalling logs on both browser and server.
5. Check that the Unreal streamer actually connects to the configured signalling endpoint.
6. Inspect ICE candidates and selected candidate pair. If direct connectivity fails, verify TURN credentials, reachability, advertised public address, and relay traffic.
7. Do not use a Cloudflare HTTP tunnel as evidence that UDP/WebRTC media is reachable. It can front the web/signalling surface without solving peer media traversal.
8. Add SFU only for a topology that needs it; do not add components while basic P2P is still failing.
9. Capture the working config and the external-network test in repo documentation.

## Version traps

- Use current external Pixel Streaming Infrastructure rather than assuming scripts bundled with an old engine sample are canonical.
- Matchmaker is deprecated in newer UE versions; do not design new systems around it without a specific compatibility reason.
- SFU capabilities and status are version-sensitive. Check current Epic docs before treating it as a stable scaling primitive.

Read `references/networking.md` before changing TURN/SFU/tunnel topology.
