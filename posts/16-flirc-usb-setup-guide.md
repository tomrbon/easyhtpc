---
title: "FLIRC USB Setup Guide: Program Any IR Remote for Your HTPC"
description: "Complete step-by-step guide to setting up FLIRC USB receiver. Learn to program any infrared remote to control your HTPC with custom button mappings."
date: 2026-02-21
categories: ["remotes"]
category: "remotes"
image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=400&fit=crop"
tags: ["remotes", "htpc", "input"]
layout: article.njk
---

# FLIRC USB Setup Guide: Program Any IR Remote to Work With Your HTPC

The FLIRC USB receiver represents one of the cleverest solutions in the HTPC world: a tiny device that translates infrared remote signals into keyboard commands your computer understands. This simple concept delivers extraordinary flexibility—you can use virtually any IR remote to control your home theater PC.

Whether you have a favorite old remote, want to consolidate devices with a universal remote, or simply prefer the feel of a traditional controller, FLIRC makes it possible. This comprehensive guide walks you through everything from initial setup to advanced programming techniques.

## What Is FLIRC and How Does It Work?

Understanding FLIRC requires understanding how HTPCs process input:

**Traditional Keyboard Control:**
Media center software like Kodi, Plex, and MediaPortal respond to keyboard shortcuts. Press the spacebar, and playback pauses. Press the arrow keys, and you navigate menus. This keyboard-centric design makes sense—computers expect keyboard input.

**The FLIRC Solution:**
FLIRC acts as a translator. When you press a button on your infrared remote, FLIRC receives the IR signal and converts it to a keyboard command your computer recognizes. To your HTPC, it appears as though someone pressed a key on a keyboard, even though you're actually using a remote control.

**Why This Matters:**
- **Universal Compatibility**: Any software that accepts keyboard shortcuts works with FLIRC
- **Remote Flexibility**: Use any IR remote you prefer
- **No Drivers**: FLIRC appears as a standard HID keyboard device
- **Cross-Platform**: Works with Windows, Mac, Linux, and even some game consoles

### FLIRC USB vs. Other HTPC Remote Solutions

| Solution | Remote Flexibility | Software Support | Setup Complexity | Cost |
|----------|-------------------|------------------|------------------|------|
| FLIRC USB | Any IR remote | Universal | Low | ~$23 |
| Pre-programmed Remotes | Limited | Specific apps | Low-Medium | $15-50 |
| Air Mouse Remotes | Included only | Universal | Low | $20-40 |
| Keyboard/Mouse | N/A | Universal | None | $20+ |
| Smartphone Apps | Phone only | Limited | Medium | Free-$10 |

FLIRC occupies a unique position: infinite remote flexibility with universal software support at a reasonable price.

## What You'll Need

Before beginning the setup process, gather these essentials:

**Required:**
- FLIRC USB receiver
- Computer (Windows, Mac, or Linux)
- IR remote control (any IR remote will work)
- FLIRC software (free download)

**Optional but Recommended:**
- USB extension cable (helps with IR reception)
- Multiple remotes (for different rooms/users)
- Universal remote (for consolidated control)

### Choosing a Remote for FLIRC

Virtually any infrared remote works with FLIRC, but some considerations improve your experience:

**Good Choices:**
- Remotes you already own and like
- Universal remotes (Harmony, SofaBaton, etc.)
- Media center remotes designed for other platforms
- Remotes with good button layouts and comfortable ergonomics
- Remotes with buttons you can press without looking

**Avoid:**
- RF-only remotes (they don't transmit IR)
- Bluetooth remotes (same issue)
- Remotes with worn or failing buttons
- Remotes with missing batteries or corrosion

**Pro Tip:** Old cable box remotes, TV remotes from previous sets, and universal remotes from discount stores all work excellently with FLIRC.

## Step 1: Download and Install FLIRC Software

The FLIRC software provides the interface for programming your remote. It's free and available for all major operating systems.

### Windows Installation

1. Visit the FLIRC website downloads page
2. Download the Windows installer
3. Run the installer and follow prompts
4. Allow the software to install drivers if requested
5. Launch FLIRC from the Start menu

### macOS Installation

1. Download the macOS version from FLIRC's website
2. Open the downloaded DMG file
3. Drag FLIRC to your Applications folder
4. Launch FLIRC from Applications
5. Permit the app to control your system when prompted

### Linux Installation

FLIRC provides packages for common distributions:

**Ubuntu/Debian:**
```
sudo apt-get install flirc
```

**Arch Linux:**
```
sudo pacman -S flirc
```

**Fedora:**
```
sudo dnf install flirc
```

Alternatively, download the standalone binary and run it directly.

## Step 2: Connect FLIRC USB

Insert the FLIRC USB receiver into an available USB port on your computer:

**Recommended:**
- Use a USB port on the same side as your viewing position
- If using a USB extension, position the receiver where it has a clear line-of-sight to your seating area
- Avoid USB hubs when possible—direct connections are more reliable

**FLIRC Software Detection:**
When you launch the FLIRC software with the device connected, you'll see:
- Device status showing "Connected"
- Current firmware version
- A visual representation of the remote control you'll program

If the software doesn't detect the device:
- Try a different USB port
- Check if the device appears in your system's device list
- Restart the FLIRC software
- Look for USB power indicators (some FLIRC models have LED lights)

## Step 3: Understanding the FLIRC Interface

The FLIRC software presents a clean interface with several key areas:

### Main Programming View

The central display shows a generic remote control layout with various buttons:
- **Arrow keys** (directional navigation)
- **Playback controls** (play, pause, stop, skip)
- **Function keys** (F1-F12 mappings)
- **Number pad** (for channel entry and numeric input)

Clicking a button on this virtual remote prepares FLIRC to learn the corresponding IR signal from your physical remote.

### Menu Options

**Controllers**: Pre-configured profiles for common media software
**Keyboard**: Direct keyboard key assignment
**Full Keyboard**: Access to all keyboard keys
**Advanced**: Settings for sensitivity, noise, and firmware updates

### Status Indicators

The software displays real-time information:
- IR signal detection (shows when FLIRC receives any IR signal)
- Current button being programmed
- Error messages for troubleshooting

## Step 4: Program Basic Navigation Controls

Start with the fundamental navigation controls. These mappings give you directional movement and selection capability—all you need for basic menu navigation.

### Programming Arrow Keys

1. Click the **Up Arrow** button in the FLIRC software
2. The status bar shows "Waiting for button..."
3. Point your IR remote at the FLIRC receiver
4. Press the button you want to use for "Up" on your remote
5. FLIRC confirms with a success message
6. Repeat for Down, Left, and Right arrows

**Pro Tip:** Many users prefer to use a remote's directional pad (D-pad) for these functions, as it matches the intuitive layout most media interfaces expect.

### Programming the Select/OK Button

1. Click the **OK** or **Enter** button in FLIRC
2. Point your remote and press your desired select button
3. FLIRC maps this to the Enter key

**Common Mappings:**
- Use the center button on your remote's D-pad
- Use a dedicated "OK" or "Select" button
- Some users map number "1" or another easy-to-find button

### Verifying Basic Navigation

Before continuing, test your work:
1. Open a file manager or web browser
2. Use your remote's directional buttons
3. Verify cursor/selection moves appropriately
4. Test the OK button to confirm selection works

If any direction doesn't respond, reprogram that specific button.

## Step 5: Program Playback Controls

Media playback controls are essential for any HTPC. These typically map to standard keyboard shortcuts that media software universally recognizes.

### Standard Playback Mappings

| Remote Button | FLIRC Maps To | Common Function |
|---------------|---------------|-----------------|
| Play | P or Space | Play media |
| Pause | Space | Pause playback |
| Play/Pause | Space | Toggle play/pause |
| Stop | X or S | Stop playback |
| Skip Forward | Right Arrow or F | Skip ahead |
| Skip Backward | Left Arrow or B | Skip back |
| Fast Forward | F or > | Fast forward |
| Rewind | R or < | Rewind |

**Programming Steps:**
1. Click the corresponding button in FLIRC's interface
2. Point your remote and press the desired button
3. Confirm successful programming
4. Test in your media software

### Software-Specific Considerations

Different media applications use different keyboard shortcuts:

**Kodi Default Shortcuts:**
- Space = Play/Pause
- X = Stop
- Arrow Left/Right = Seek backward/forward
- F = Fast forward
- R = Rewind

**Plex Media Player:**
- Space = Play/Pause
- S = Stop
- Arrow Left/Right = Seek
- G = Go back

**VLC Media Player:**
- Space = Play/Pause
- S = Stop
- Arrow Left/Right = Seek
- F = Fast forward

Check your software's keyboard shortcuts and program FLIRC accordingly. The FLIRC software includes preset profiles for popular applications.

## Step 6: Program Volume Controls

Volume control requires special consideration because it often involves integration with your audio system rather than just software control.

### Software Volume Control

Program FLIRC to send volume control keystrokes:

| Function | Common Keys |
|----------|-------------|
| Volume Up | Up arrow, +, or media volume up key |
| Volume Down | Down arrow, -, or media volume down key |
| Mute | M or media mute key |

**To use media keys:**
1. In FLIRC software, select "Full Keyboard"
2. Choose the multimedia key functions
3. Program your remote's volume buttons

### Advanced: Integrating TV/Stereo Volume

If you use a universal remote:
1. Program your universal remote to control TV/receiver volume via IR directly
2. Use FLIRC mappings for computer volume as a secondary control
3. This allows independent control or synchronized volume changes

## Step 7: Advanced Programming Techniques

Once you've mastered basic FLIRC programming, explore these advanced capabilities.

### Custom Keyboard Shortcuts

FLIRC can map remote buttons to any keyboard key or combination:

1. Open "Full Keyboard" view
2. Click your desired key (or use modifier+key combinations)
3. Press the remote button to assign

**Useful Custom Mappings:**
- **Home**: Map to keyboard Home key (returns to menu start)
- **Back**: Map to Escape or Backspace
- **Menu**: Map to M or context menu key
- **Info**: Map to I (shows media information in Kodi/Plex)
- **Subtitle**: Map to S or L
- **Fullscreen**: Map to F11

### Long Press Actions

FLIRC supports long-press differentiation, assigning different actions to short and long button presses:

1. In FLIRC software, enable "Long Press" in settings
2. Program short press normally
3. Then program long press to a different key
4. Adjust timing threshold as needed

**Common Long Press Uses:**
- Short press: Navigate up, Long press: Page up
- Short press: Play/Pause, Long press: Stop
- Short press: Select, Long press: Context menu

### Controller Profiles

FLIRC includes pre-built profiles for popular software:

1. Select "Controllers" menu
2. Choose your media software (Kodi, Boxee, etc.)
3. FLIRC automatically maps remote buttons to appropriate keys
4. Only program buttons not covered by the profile

This approach saves time and ensures correct mappings for complex applications.

## Step 8: Configure Sleep and Wake Functions

One of FLIRC's powerful features is the ability to wake your HTPC from sleep mode using your remote.

### Enabling Wake Function

**Windows:**
1. Open Device Manager
2. Find FLIRC under "Keyboards" or "Human Interface Devices"
3. Right-click → Properties
4. Power Management tab
5. Check "Allow this device to wake the computer"

**macOS:**
- FLIRC wake function works automatically with sleep mode

**Linux:**
```
sudo sh -c "echo enabled > /sys/bus/usb/devices/*/power/wakeup"
```
(Adjust for your specific USB device path)

### Programming the Power Button

1. Map a remote button to the keyboard power key
2. In FLIRC software, use Full Keyboard mode
3. Select the power function
4. Program your preferred remote button

This allows your remote to sleep and wake your HTPC.

## Step 9: Troubleshooting Common Issues

### Remote Not Detected/Not Learning

**Symptoms:** FLIRC software doesn't recognize button presses

**Solutions:**
- Ensure you're pointing the remote directly at the FLIRC receiver
- Check remote batteries
- Try a different USB port
- Verify the remote transmits IR (some phones have IR cameras that show IR light)
- Test with a different remote to confirm FLIRC works

### Button Already Programmed Error

**Symptoms:** FLIRC says button is already assigned

**Solutions:**
- Clear the button: In FLIRC software, right-click the button and select "Clear"
- Or clear entire remote: Settings → Clear
- Then reprogram the button

### Mapped Keys Don't Work in Software

**Symptoms:** FLIRC shows successful programming, but buttons don't work in your application

**Solutions:**
- Verify the software supports keyboard shortcuts
- Check what keyboard shortcuts your software uses
- Test by pressing the actual keyboard key—if it doesn't work, the problem isn't FLIRC
- Ensure FLIRC isn't in "limited" mode (check settings)

### Interference or Erratic Behavior

**Symptoms:** Random inputs, missed commands, or double commands

**Solutions:**
- Reduce IR noise: Some LCD/plasma screens emit IR that interferes
- Move FLIRC away from other IR sources
- Adjust sensitivity in FLIRC settings (Advanced → Noise Canceler)
- Use a USB extension to position FLIRC optimally

### Duplicate Commands

**Symptoms:** Single button press produces multiple actions

**Solutions:**
- Enable "Inter-key delay" in FLIRC settings
- Increase the delay value until behavior stops
- Some cheap remotes have "bounce" issues—try a different remote

## Step 10: Backup and Restore Your Configuration

After investing time in programming, protect your work:

### Saving Configuration

1. In FLIRC software, select **File → Save Configuration**
2. Choose a location and meaningful filename
3. Include date and remote type in the filename for easy reference

### Restoring Configuration

1. Select **File → Load Configuration**
2. Navigate to your saved file
3. FLIRC uploads the configuration to the USB device

**Use Cases:**
- Migrating to a new computer
- Recovering from accidental clears
- Quickly switching between different remote configurations

## FLIRC Setup for Popular HTPC Applications

### Kodi Configuration

Kodi includes extensive keyboard shortcut support, making it an excellent FLIRC partner.

**Recommended Kodi Mappings:**

| Remote Button | Key | Kodi Function |
|---------------|-----|---------------|
| D-pad Up | Up | Navigate up |
| D-pad Down | Down | Navigate down |
| D-pad Left | Left | Navigate left |
| D-pad Right | Right | Navigate right |
| OK/Select | Enter | Select item |
| Back | Escape | Go back |
| Menu | M | Context menu |
| Play | Space | Play |
| Pause | Space | Pause |
| Stop | X | Stop |
| Skip Forward | Right | Skip forward |
| Skip Back | Left | Skip backward |
| Volume Up | + | Volume up |
| Volume Down | - | Volume down |
| Mute | F8 | Mute |
| Info | I | Information |
| Subtitles | L | Subtitles |
| Home | Home | Main menu |

**Kodi also provides a FLIRC keymap** on their wiki with optimized settings.

### Plex Setup

Plex Media Player uses different shortcuts than Kodi:

| Remote Button | Key | Plex Function |
|---------------|-----|---------------|
| Play/Pause | Space | Toggle playback |
| Stop | S | Stop |
| Skip Forward | Right | Seek forward |
| Skip Back | Left | Seek backward |
| Home | G | Return to home |
| Back | Backspace | Go back |

### Emby/Jellyfin

These servers typically use web-based players with standard keyboard shortcuts that map easily to FLIRC.

## Optimizing FLIRC Performance

### USB Placement

IR reception quality depends significantly on positioning:

- **Direct line-of-sight**: Best performance
- **Front-facing USB ports**: Often better than rear ports
- **USB extensions**: Allow optimal positioning away from interference
- **Avoid**: Positioning near IR-emitting displays or bright lights

### Sensitivity Settings

FLIRC's advanced settings include sensitivity controls:

- **Lower sensitivity**: Reduces interference but requires more precise aiming
- **Higher sensitivity**: Works at wider angles but may pick up noise
- **Default setting**: Works well for most situations
- Adjust incrementally and test in your environment

### Firmware Updates

FLIRC periodically releases firmware updates:

1. Connect FLIRC and open software
2. Select **Advanced → Firmware**
3. Check for updates
4. Follow update instructions carefully
5. Re-program buttons if required (some updates clear memory)

---

![USB receiver connected to computer](https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&h=400&fit=crop)

## Frequently Asked Questions

### Can FLIRC control multiple computers?

No, each FLIRC USB only pairs with one computer at a time. However, you can use the same remote for multiple FLIRC devices—just program each FLIRC identically. When you press a button, all FLIRC receivers in range will respond, so they should be in different rooms.

### Does FLIRC work with RF remotes?

No, FLIRC only works with infrared (IR) remotes. RF (radio frequency) remotes use a completely different technology. If you have an RF remote, you'll need an IR remote to use with FLIRC.

### Can I use FLIRC with a Harmony remote?

Absolutely! Harmony remotes are excellent partners for FLIRC. Program FLIRC to recognize Harmony's IR commands, and you can control your entire entertainment system from one remote.

### How many buttons can FLIRC learn?

FLIRC can store approximately 160 unique button commands, far more than any remote has buttons. You won't run out of programming capacity.

### Will FLIRC work through walls or cabinets?

No, infrared requires line-of-sight. FLIRC must "see" the remote's IR signal. For hidden equipment, use an IR repeater system that routes IR signals through walls/cabinets to the FLIRC receiver.

### Does FLIRC work with game consoles?

FLIRC works with PlayStation 3 and some other devices that accept standard USB keyboard input. It does not work with Xbox or Nintendo Switch. Check FLIRC's compatibility list for specifics.

---

## Start Controlling Your HTPC Today

The FLIRC USB receiver transforms any infrared remote into a powerful HTPC controller through a beautifully simple concept: translating IR signals into keyboard commands. Whether you're repurposing an old remote, consolidating with a universal controller, or simply prefer the tactile feel of traditional remotes, FLIRC provides the flexibility to control your media experience your way.

This guide covered everything from basic setup to advanced programming techniques. The skills you've learned will serve you well as you customize your HTPC control to match your exact preferences.

<div class="cta-box">
**Get Your FLIRC USB Receiver**

Ready to program your perfect HTPC remote?

- [FLIRC USB v2 on Amazon](https://www.amazon.com/flirc-usb) - Latest generation with improved sensitivity

**Recommended Companion Gear:**

- [SofaBaton U2 Remote](https://www.amazon.com/sofabaton-u2) - Excellent universal remote to pair with FLIRC
- [USB Extension Cable](https://www.amazon.com/usb-extension) - Optimize FLIRC positioning

*We may earn a commission on purchases made through these links.*
</div>