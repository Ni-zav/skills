# Pixel Streaming Networking Notes

Checked: 2026-10-04.

Primary sources:

- https://dev.epicgames.com/documentation/en-us/unreal-engine/pixel-streaming-in-unreal-engine
- https://dev.epicgames.com/documentation/unreal-engine/pixel-streaming-infrastructure
- https://dev.epicgames.com/documentation/unreal-engine/hosting-and-networking-guide-for-pixel-streaming-in-unreal-engine

Current architecture:

- Pixel Streaming Infrastructure is maintained outside the Unreal Engine repository and includes the frontend, Signalling Web Server, and SFU components.
- The Signalling Web Server is a mandatory part of the normal stack.
- Matchmaker is deprecated from UE 5.5 onward.
- TURN is often required when peers cannot establish direct connectivity across NAT/firewall boundaries. TURN relays media, so bandwidth and public reachability matter.
- Epic documents CoTURN as a production-ready open-source TURN option.
- SFU is for one-to-many distribution and adapts delivery using simulcast, but its support/status and encoder implications are version-sensitive.

## Diagnostic evidence to capture

- browser console signalling events;
- signalling server connection logs;
- Unreal streamer connection log;
- ICE candidate list and selected candidate pair;
- whether selected path is host/srflx/relay;
- TURN server logs during the connection attempt;
- external-network result, not only same-LAN result.

Avoid fixing a WebRTC failure by repeatedly changing HTTP proxy settings after signalling is already proven.
