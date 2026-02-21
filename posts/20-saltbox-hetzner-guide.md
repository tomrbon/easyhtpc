---
title: "SaltBox Guide: Cloud Media Server on Hetzner VPS"
description: "Deploy a fully-featured cloud media server on Hetzner VPS with SaltBox. Complete setup guide for streaming your media library from anywhere in the world."
date: 2026-02-21
categories: ["media-servers"]
category: "media-servers"
image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop"
tags: ["media-servers", "software", "cloud"]
layout: article.njk
---

## Why Run Your Media Server in the Cloud?

Running a home media server is rewarding—you have complete control over your content, no monthly subscription fees eat into your budget, and your media library grows exactly the way you want. But home servers come with challenges: electricity costs, hardware maintenance, noise, heat, and the nagging worry about what happens when your internet connection goes down.

What if you could get all the benefits of a dedicated media server without the hardware headaches? A cloud-based media server offers exactly that: a virtual machine in a data center with enterprise-grade internet connectivity, redundant power, and climate-controlled environments. You get the convenience of cloud services without the recurring costs of commercial streaming platforms.

This is where SaltBox enters the picture. SaltBox is an automated deployment script that transforms a bare Linux server into a fully-configured media server with all the applications you need—Plex, Jellyfin, Sonarr, Radarr, download clients, and more—installed and configured in under an hour.

Combined with a Hetzner VPS, you get a cost-effective, high-performance media server that streams to anywhere in the world. My personal setup uses a Hetzner VPS with SaltBox, and the performance has been exceptional—1080p streams to multiple devices simultaneously with zero buffering, all for less than the cost of a single streaming subscription.

---

## What Is SaltBox?

<figure>
  <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=400&fit=crop" alt="Cloud computing infrastructure" loading="lazy">
  <figcaption>Cloud infrastructure powers modern media streaming</figcaption>
</figure>

SaltBox is an Ansible-based deployment system that automates the installation and configuration of a complete media server stack. Originally forked from the popular Saltbox project, it has evolved into a comprehensive solution for deploying media server applications on any Linux server.

### What SaltBox Installs

SaltBox can deploy an entire media server ecosystem:

**Media Servers:**
- **Plex** – The most popular media server with clients for every platform
- **Jellyfin** – Free, open-source alternative with no subscription requirements
- **Emby** – Feature-rich media server with live TV support

**Media Management:**
- **Sonarr** – TV show management and automation
- **Radarr** – Movie management and automation
- **Lidarr** – Music collection management
- **Readarr** – Book and audiobook management
- **Bazarr** – Subtitle management for Sonarr and Radarr

**Download Clients:**
- **qBittorrent** – Full-featured BitTorrent client
- **Transmission** – Lightweight torrent client
- **SABnzbd** – Usenet downloader
- **NZBGet** – Efficient Usenet client

**Request and Monitoring:**
- **Overseerr** – Media request management
- **Ombi** – Alternative request system
- **Tautulli** – Plex statistics and monitoring
- **Portainer** – Docker container management

**Supporting Services:**
- **Traefik** – Reverse proxy with automatic SSL
- **Authelia** – Two-factor authentication portal
- **Watchtower** – Automatic container updates
- **Docker** – Container runtime

### Why SaltBox Over Manual Setup?

Setting up a media server manually involves:
1. Installing Docker and Docker Compose
2. Creating directory structures
3. Writing docker-compose.yml files for each service
4. Configuring networking and ports
5. Setting up reverse proxy and SSL
6. Configuring authentication
7. Connecting services together

This process takes 4-8 hours even for experienced users and often requires troubleshooting.

SaltBox automates everything:
1. Run the installer script
2. Answer configuration questions
3. Wait 30-45 minutes
4. Access your configured services

The result is identical to a manual setup but completed in a fraction of the time.

---

## Why Hetzner for Your Cloud Media Server?

Hetzner is a German hosting provider known for exceptional value—powerful servers at prices that undercut major cloud providers by significant margins. For media servers, Hetzner offers advantages that make it an ideal choice.

### Cost Comparison

| Provider | Instance Type | vCPU | RAM | Storage | Monthly Cost |
|----------|---------------|------|-----|---------|--------------|
| Hetzner | CPX31 | 4 | 8GB | 80GB NVMe | ~$12 |
| DigitalOcean | Standard | 4 | 8GB | 160GB | $48 |
| AWS Lightsail | Medium | 2 | 4GB | 80GB | $24 |
| Linode | Dedicated | 4 | 8GB | 256GB | $36 |

Hetzner's pricing is particularly attractive for media servers, where you need:
- Sufficient CPU for transcoding
- Adequate RAM for multiple services
- Fast storage for responsive libraries

### Hetzner's Advantages for Media Streaming

**Network Performance:**
- Unmetered inbound traffic
- Generous outbound allowances (usually 20TB+)
- Multiple data center locations (Germany, Finland, USA)
- Excellent peering to Europe and North America

**Hardware:**
- Latest AMD EPYC processors
- NVMe storage standard
- Reliable hardware with redundancy

**Terms of Service:**
- No strict bandwidth caps
- Reasonable acceptable use policies
- Generally supportive of self-hosted services

### Hetzner Locations

| Location | Code | Best For |
|----------|------|----------|
| Falkenstein, Germany | fsn1 | European users |
| Helsinki, Finland | hel1 | European users, slightly lower prices |
| Ashburn, USA | ash | North American users |
| Hillsboro, USA | hil | North American users |

Choose the location closest to your primary viewing audience for optimal streaming performance.

---

## Prerequisites for SaltBox Deployment

Before deploying SaltBox, ensure you have the following:

### Technical Requirements

1. **A Hetzner Cloud Account**
   - Sign up at hetzner.com
   - Add payment method (credit card or PayPal)
   - Verify your account

2. **Domain Name** (Recommended)
   - Required for SSL certificates
   - Enables proper subdomain routing (plex.yourdomain.com, sonarr.yourdomain.com)
   - Approximately $10-15/year from registrars like Namecheap or Cloudflare

3. **SSH Client**
   - Terminal on macOS/Linux
   - PuTTY or Windows Terminal on Windows

### Server Sizing

Hetzner offers several CX and CPX series servers. For media servers:

| Server | vCPU | RAM | Storage | Use Case |
|--------|------|-----|---------|----------|
| CPX21 | 3 | 4GB | 80GB | Light use, direct play only |
| CPX31 | 4 | 8GB | 80GB | Recommended, handles transcoding |
| CPX41 | 8 | 16GB | 240GB | Power users, multiple transcodes |
| CPX51 | 16 | 32GB | 360GB | Heavy use, many concurrent streams |

**My recommendation:** Start with CPX31 (4 vCPU, 8GB RAM). It handles:
- Multiple simultaneous 1080p streams
- Hardware transcoding if available
- All standard SaltBox applications

For 4K transcoding or many concurrent users, consider CPX41.

*Note: Always comply with copyright laws and streaming service terms of service in your jurisdiction. This guide is for educational purposes only.*

---

## Step-by-Step: Creating Your Hetzner VPS

### Step 1: Create a New Project

1. Log into your Hetzner Cloud Console at console.hetzner.cloud
2. Click "New Project" if this is your first server
3. Name it something like "Media Server"
4. Select the project

### Step 2: Create the Server

1. Click "Add Server"

2. **Select Location:**
   - Choose the data center closest to your viewers
   - For Europe: fsn1 (Falkenstein) or hel1 (Helsinki)
   - For North America: ash (Ashburn) or hil (Hillsboro)

3. **Select Operating System:**
   - Choose Ubuntu 22.04 or 24.04 LTS
   - SaltBox is designed for Ubuntu

4. **Select Server Type:**
   - Choose CPX series for better CPU performance
   - Recommended: CPX31 (4 vCPU, 8GB RAM)

5. **Add SSH Key:**
   - Click "Add new SSH key"
   - Paste your public key (usually in ~/.ssh/id_rsa.pub)
   - This enables passwordless login

6. **Additional Options:**
   - Enable "Backups" for €0.02/GB/month (recommended)
   - Skip IPv4 if you're comfortable with IPv6-only (saves €1.50/month)

7. **Name and Create:**
   - Give your server a memorable name like "media-server"
   - Click "Create & Buy Now"

The server provisions in about 30-60 seconds.

### Step 3: Initial Server Access

Once your server is running, note its IP address from the Hetzner console.

Connect via SSH:

```bash
ssh root@your-server-ip
```

If you're using an SSH key and the connection fails, add the `-i` flag:

```bash
ssh -i ~/.ssh/your-key root@your-server-ip
```

### Step 4: Update the System

Before installing SaltBox, update your server:

```bash
apt update && apt upgrade -y
apt install -y curl wget git
```

---

## Deploying SaltBox

With your server prepared, it's time to deploy SaltBox.

### Step 1: Run the SaltBox Installer

SaltBox provides a simple one-line installer:

```bash
curl -sL https://install.saltbox.dev | bash
```

The installer will:
1. Install required dependencies
2. Clone the SaltBox repository
3. Begin the configuration process

### Step 2: Configuration Wizard

The installer launches a configuration wizard. You'll need to provide:

**User Configuration:**
- Create a non-root user for running services
- Set a password for this user
- The installer typically suggests `saltbox` or `abcd`

**Domain Setup:**
- Enter your domain name (e.g., media.yourdomain.com)
- If you don't have a domain, you can use IP-based access
- DNS records need to point to your server IP

**Service Selection:**
SaltBox asks which services you want to install. For a typical media server, select:

| Service | Recommended | Purpose |
|---------|-------------|---------|
| Plex | Yes | Primary media server |
| Sonarr | Yes | TV show management |
| Radarr | Yes | Movie management |
| Bazarr | Yes | Subtitles |
| qBittorrent | Yes | Torrent client |
| SABnzbd | Optional | Usenet downloader |
| Overseerr | Yes | Request management |
| Tautulli | Yes | Plex statistics |
| Portainer | Yes | Container management |

**Docker Configuration:**
- Accept default Docker settings
- The installer handles network and volume setup

### Step 3: Wait for Installation

The SaltBox installation takes 30-60 minutes depending on:
- Selected services
- Server performance
- Network speed

You'll see progress output as each component installs:
- Docker and Docker Compose
- Traefik reverse proxy
- Each media service
- Configuration files

### Step 4: Post-Installation Configuration

After the main installation completes:

1. **Check service status:**
   ```bash
   docker ps
   ```
   All selected services should show "Up" status.

2. **Access Portainer** (if installed):
   - Navigate to portainer.yourdomain.com
   - Create an admin account
   - All containers should be running

3. **Configure DNS:**
   Ensure your DNS records point to your server:
   ```
   A    @                   your-server-ip
   A    plex                your-server-ip
   A    sonarr              your-server-ip
   A    radarr              your-server-ip
   A    overseerr           your-server-ip
   ```

---

## Configuring Plex on Your SaltBox Server

Plex is often the centerpiece of a media server setup. Here's how to configure it after SaltBox installation.

### Claiming Your Plex Server

1. **Access Plex Web Interface:**
   - Navigate to plex.yourdomain.com
   - Or use the server's local interface

2. **First-Time Setup:**
   - Sign in with your Plex account
   - The server should appear for claiming
   - If not, you may need to use the claim token method

3. **Claim Token Method (if needed):**
   ```bash
   # Get claim token from plex.tv/claim
   # SSH into your server
   docker exec -it plex bash
   # Run with claim token
   export PLEX_CLAIM=your-claim-token
   ```

### Setting Up Libraries

1. **Access Plex Settings → Libraries**

2. **Add Movies Library:**
   - Name: Movies
   - Type: Movies
   - Language: Your preference
   - Agent: Plex Movie
   - Scanner: Plex Video Files Scanner
   - Folders: /data/Media/Movies

3. **Add TV Shows Library:**
   - Name: TV Shows
   - Type: Shows
   - Folders: /data/Media/TV

### Plex Transcoding on a VPS

VPS servers typically don't have GPUs, so transcoding relies on CPU. For optimal performance:

**Enable Hardware Transcoding If Available:**
- Some Hetzner servers support Intel QuickSync
- Check under Plex → Settings → Transcoder
- Enable "Use hardware acceleration when available"

**Optimize Streaming Settings:**
- Set "Remote quality" to match your typical viewer connection
- Limit "Maximum simultaneous video streams" to 3-4 for CPX31
- Enable "Enable HDR tone mapping" only if needed

**Reduce Transcoding Load:**
- Optimize media files ahead of time
- Use direct-play-compatible formats (H.264/H.265)
- Set remote streams to lower quality if bandwidth is limited

---

## Connecting Download Clients to Media Management

A key advantage of SaltBox is the pre-configured integration between services.

### Sonarr Configuration

1. **Access sonarr.yourdomain.com**

2. **Add Download Client:**
   - Settings → Download Clients → Add
   - Select qBittorrent
   - Host: qbittorrent
   - Port: 8080
   - Username/Password: (from SaltBox config)

3. **Add Indexers:**
   - Settings → Indexers → Add
   - Configure your preferred indexers
   - Use Jackett for tracker integration if needed

4. **Connect to Plex:**
   - Settings → Connect → Add → Plex Media Server
   - Configure the Plex connection for automatic library updates

### Radarr Configuration

Follow the same process for Radarr:
1. Add qBittorrent as download client
2. Configure indexers
3. Connect to Plex

### qBittorrent Configuration

1. **Access qbittorrent.yourdomain.com**

2. **Configure Categories:**
   - Create "radarr" category for movies
   - Create "sonarr" category for TV shows
   - Set download paths accordingly

3. **Connection Settings:**
   - Settings → BitTorrent
   - Enable encryption
   - Set appropriate connection limits

---

## Storage Solutions for SaltBox

One challenge with cloud media servers is storage. Hetzner VPS instances include limited storage (80-360GB), which may not accommodate large media libraries.

### Option 1: Hetzner Storage Box

Hetzner offers affordable storage-only products called Storage Boxes:

| Plan | Storage | Price/month |
|------|---------|-------------|
| BX11 | 100GB | €3.81 |
| BX21 | 512GB | €7.44 |
| BX22 | 1TB | €9.89 |
| BX41 | 2TB | €14.71 |
| BX42 | 5TB | €22.37 |

**Advantages:**
- Mounted via SMB/CIFS or SFTP
- Suitable for media files
- Separate from VPS (survives rebuilds)

**Configuration:**
```bash
# Install cifs-utils
apt install cifs-utils

# Create mount point
mkdir -p /mnt/storagebox

# Add to /etc/fstab
//your-storagebox-url/backup /mnt/storagebox cifs username=your-user,password=your-password,uid=1000,gid=1000 0 0

# Mount
mount -a
```

Configure SaltBox to use /mnt/storagebox/Media for your media files.

### Option 2: External Cloud Storage

Services like Google Drive, Dropbox, or pCloud can be mounted:

**Using rclone:**
```bash
# Install rclone
curl https://rclone.org/install.sh | sudo bash

# Configure remote
rclone config

# Mount Google Drive
rclone mount gdrive: /mnt/gdrive --allow-other --dir-cache-time 72h --vfs-cache-mode full
```

**Caveats:**
- API limits may cause issues
- Not ideal for frequent access
- Better for archiving than active streaming

### Option 3: Upgrade to a Dedicated Server

For large libraries, consider Hetzner's dedicated servers (Robot):

| Server | CPU | RAM | Storage | Price/month |
|--------|-----|-----|---------|-------------|
| AX41 | Ryzen 5 | 64GB | 2×512GB NVMe | ~€38 |
| AX42 | Ryzen 7 | 128GB | 2×1TB NVMe | ~€52 |
| Storage Servers | Various | Various | 2×4TB+ | €30-100 |

Dedicated servers provide:
- Much more storage
- Better CPU performance
- Potentially upgradeable hardware

---

## Security and Access Control

### Traefik and SSL

SaltBox configures Traefik as a reverse proxy with automatic Let's Encrypt SSL certificates:

**Features:**
- Automatic SSL certificate generation
- Certificate renewal
- Subdomain routing
- HTTP to HTTPS redirect

**Verify SSL:**
```bash
# Check Traefik logs
docker logs traefik

# Test SSL
curl -v https://plex.yourdomain.com
```

### Authelia for Two-Factor Authentication

If you enabled Authelia during installation, your services are protected by two-factor authentication:

1. **Access Authelia:**
   - Navigate to auth.yourdomain.com
   - Create your account

2. **Configure Users:**
   - Edit /opt/saltbox/authelia/users_database.yml
   - Add family members with individual accounts

3. **Service Protection:**
   - Services behind Authelia require login
   - Useful for public-facing installations

### Basic Security Hardening

Beyond SaltBox defaults, consider these hardening steps:

**UFW Firewall:**
```bash
# Install and enable UFW
apt install ufw
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow http
ufw allow https
ufw enable
```

**Fail2Ban:**
```bash
# Install Fail2Ban
apt install fail2ban

# Enable for SSH
systemctl enable fail2ban
systemctl start fail2ban
```

**Regular Updates:**
```bash
# Enable automatic security updates
apt install unattended-upgrades
dpkg-reconfigure -plow unattended-upgrades
```

---

## Monitoring and Maintenance

### Watchtower for Automatic Updates

SaltBox includes Watchtower, which automatically updates containers:

**Check Watchtower status:**
```bash
docker logs watchtower
```

**Update immediately:**
```bash
docker exec watchtower /watchtower --run-once
```

### Tautulli for Plex Monitoring

Tautulli provides detailed Plex analytics:

1. **Access tautulli.yourdomain.com**

2. **Configure:**
   - Link to your Plex account
   - Set up notifications for:
     - User activity
     - Stream statistics
     - Server alerts

3. **Monitor:**
   - Concurrent streams
   - Bandwidth usage
   - Transcoding statistics
   - User history

### Server Resource Monitoring

Check server resources regularly:

```bash
# CPU and memory usage
htop

# Disk usage
df -h

# Docker container stats
docker stats

# Network usage
nload
```

---

## Backup Strategies

### Docker Volume Backups

SaltBox stores all configuration in Docker volumes. Back these up regularly:

```bash
# Backup all SaltBox configs
tar -czf saltbox-backup-$(date +%Y%m%d).tar.gz /opt/saltbox

# Backup Docker volumes
docker run --rm -v saltbox_config:/data -v $(pwd):/backup alpine tar -czf /backup/config.tar.gz /data
```

### Remote Backup Sync

Use rsync or rclone to sync backups to remote storage:

```bash
# Sync to Hetzner Storage Box
rsync -avz /opt/saltbox-backups/ your-storagebox:/backups/

# Or use rclone for cloud storage
rclone sync /opt/saltbox-backups/ gdrive:backups/saltbox
```

### Automated Backup Script

Create a daily backup job:

```bash
#!/bin/bash
# /usr/local/bin/saltbox-backup.sh

BACKUP_DIR="/opt/backups"
DATE=$(date +%Y%m%d)

# Create backup
tar -czf $BACKUP_DIR/saltbox-$DATE.tar.gz /opt/saltbox

# Keep only 7 days of backups
find $BACKUP_DIR -name "saltbox-*.tar.gz" -mtime +7 -delete

# Sync to remote
rclone sync $BACKUP_DIR/ gdrive:backups/saltbox
```

Add to cron:
```bash
0 3 * * * /usr/local/bin/saltbox-backup.sh
```

---

## Common Issues and Solutions

### Service Won't Start

**Symptom:** Docker container shows "Exited" or "Restarting"

**Solution:**
```bash
# Check logs
docker logs service-name

# Common fixes:
# 1. Permission issues
docker exec -u root service-name chown -R abc:abc /config

# 2. Port conflicts
docker ps -a | grep -E ':[0-9]+->'
# Stop conflicting services

# 3. Missing dependencies
# Check docker-compose.yml for required networks
docker network ls
```

### Can't Access Services

**Symptom:** Connection refused or timeout

**Solution:**
1. Check DNS: `nslookup plex.yourdomain.com`
2. Verify Traefik: `docker logs traefik | grep error`
3. Check firewall: `ufw status`
4. Verify SSL certificate: `curl -vI https://plex.yourdomain.com`

### Poor Streaming Performance

**Symptom:** Buffering or transcoding lag

**Solutions:**

1. **Check CPU usage:**
   ```bash
   htop
   ```
   If at 100%, reduce concurrent streams or upgrade server.

2. **Optimize Plex settings:**
   - Settings → Transcoder → Transcoder throttling: ON
   - Settings → Transcoder → Maximum simultaneous transcode streams: Reduce

3. **Use direct play formats:**
   - Convert media to H.264/H.265 with AAC audio
   - Avoid unusual codecs that require transcoding

4. **Enable bandwidth limiting:**
   - Settings → Remote Access → Internet upload speed: Set accurately
   - This prevents overloading your connection

### SSL Certificate Issues

**Symptom:** Browser shows certificate warning

**Solution:**
```bash
# Force certificate renewal
docker exec traefik traefik renew-certs

# Check Traefik config
cat /opt/saltbox/traefik/traefik.yml
```

---

## Real-World Configuration: My Hetzner + SaltBox Setup

Here's my actual production configuration:

### Server Specifications
- **Hetzner CPX31** (4 vCPU, 8GB RAM, 80GB NVMe)
- **Location:** Helsinki (hel1)
- **Cost:** ~€12/month
- **Operating System:** Ubuntu 22.04 LTS

### Services Deployed

| Service | Purpose | Subdomain |
|---------|---------|-----------|
| Plex | Media server | plex.domain.com |
| Sonarr | TV management | sonarr.domain.com |
| Radarr | Movie management | radarr.domain.com |
| Bazarr | Subtitles | bazarr.domain.com |
| qBittorrent | Downloads | qbittorrent.domain.com |
| Overseerr | Requests | overseerr.domain.com |
| Tautulli | Analytics | tautulli.domain.com |
| Portainer | Container management | portainer.domain.com |

### Storage Configuration
- Main drive: 80GB NVMe (system + active media)
- Hetzner Storage Box BX22 (1TB for media archive)

### Performance Metrics
- **Concurrent streams:** 3-4 (1080p)
- **Transcoding:** Supports 1-2 simultaneous transcodes
- **Monthly bandwidth:** ~2TB average
- **Uptime:** 99.9%+ over 12 months

### Lessons Learned

1. **Start small, scale up:** CPX31 is sufficient for most users
2. **Use local media when possible:** Direct play minimizes CPU load
3. **Monitor bandwidth:** Hetzner includes generous limits, but exceeding them is expensive
4. **Keep backups:** VPS can be rebuilt, but configs take time to recreate
5. **Use overseas requests:** Overseerr is easier for family members than direct Sonarr/Radarr access

---

## Cost Analysis: SaltBox vs Alternatives

### SaltBox on Hetzner

| Component | Monthly Cost |
|-----------|--------------|
| Hetzner CPX31 | €12 (~$13) |
| Storage Box (optional) | €10 (~$11) |
| Domain | ~$1 |
| **Total** | **$25/month** |

### Commercial Streaming Comparison

| Service | Monthly Cost | Content |
|---------|--------------|---------|
| Netflix Premium | $22.99 | Netflix library |
| Disney+ Premium | $13.99 | Disney library |
| HBO Max | $15.99 | HBO library |
| Hulu | $17.99 | Hulu library |
| **Total** | **$70.96/month** | Limited selection |

### Other Self-Hosted Options

| Option | Monthly Cost | Pros | Cons |
|--------|--------------|------|------|
| SaltBox on Hetzner | ~$25 | Full control, all services | Requires setup |
| Seedbox | $15-50 | Pre-configured | Limited customization |
| AWS Lightsail | $24+ | Enterprise infrastructure | Bandwidth costs |
| Home server | $10-30 electricity | Full control | Hardware costs, ISP issues |

SaltBox on Hetzner offers the best balance of cost, performance, and convenience.

*Note: Always comply with copyright laws and streaming service terms of service in your jurisdiction. This guide is for educational purposes only.*

---

## Scaling Up: When to Upgrade

### Signs You Need More Resources

1. **CPU constantly at 80%+**: Upgrade to CPX41
2. **Multiple transcoding failures**: Need more CPU power
3. **4K streaming**: Requires CPX51 or dedicated server
4. **Storage nearly full**: Add Storage Box or use external storage

### Migration Path

When outgrowing a VPS, migration is straightforward:

1. **Backup everything:**
   ```bash
   tar -czf saltbox-full.tar.gz /opt/saltbox /var/lib/docker/volumes
   ```

2. **Create new server:** Order larger instance

3. **Restore to new server:**
   ```bash
   # Install Docker
   curl -fsSL https://get.docker.com | bash
   
   # Restore backup
   tar -xzf saltbox-full.tar.gz -C /
   ```

4. **Update DNS:** Point domain to new IP

5. **Verify:** Check all services at new location

---

## Conclusion

SaltBox on a Hetzner VPS provides an exceptional platform for a cloud-based media server. You get enterprise-grade infrastructure at a fraction of cloud provider costs, combined with automated deployment that eliminates hours of manual configuration.

The combination delivers:
- **Simplicity:** One installation script deploys everything
- **Performance:** Modern CPUs and fast NVMe storage
- **Reliability:** Data center infrastructure with redundancy
- **Flexibility:** Add services as needed, scale up when required
- **Cost-effectiveness:** ~$25/month for features that would cost $70+ in streaming subscriptions

Whether you're migrating from a home server, starting fresh, or looking to reduce your streaming subscription costs, SaltBox on Hetzner offers a compelling solution that balances power, simplicity, and value.

*Note: Always comply with copyright laws and streaming service terms of service in your jurisdiction. This guide is for educational purposes only.*

---

**Ready to deploy your cloud media server?** Sign up for a Hetzner Cloud account, prepare your domain, and run the SaltBox installer. Within an hour, you'll have a fully-configured media server accessible from anywhere in the world.