/* ==================== Matrix Background ==================== */
const canvas = document.getElementById("matrix-bg");
const ctx = canvas.getContext("2d");
function sizeCanvas(){canvas.width=window.innerWidth;canvas.height=window.innerHeight}
sizeCanvas(); window.addEventListener("resize",sizeCanvas);
const glyphs = "アイウエオカキクケコｱｲｳｴｵｶｷｸｹｺ01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let fontSize = 16;
function drawMatrix(){
  ctx.fillStyle="rgba(0,0,0,.06)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  const cols = Math.floor(canvas.width/fontSize);
  if(!drawMatrix.drops || drawMatrix.drops.length!==cols){drawMatrix.drops=Array(cols).fill(0)}
  ctx.fillStyle="#57ff57";
  ctx.font=fontSize+"px monospace";
  drawMatrix.drops.forEach((y,i)=>{
    const text=glyphs[Math.floor(Math.random()*glyphs.length)];
    ctx.fillText(text,i*fontSize,y*fontSize);
    if(y*fontSize>canvas.height && Math.random()>0.975){drawMatrix.drops[i]=0}else{drawMatrix.drops[i]=y+1}
  });
}
setInterval(drawMatrix,35);

/* ==================== Data Helpers ==================== */
function parseLines(block){
  // Each line: level|title|solution|code
  return block.trim().split("\n").map(l=>{
    const [level,title,solution,code]=l.split("|").map(s=>s.trim());
    return { level, title, solution, code };
  });
}
function badge(level){
  const l=level.toLowerCase();
  if(l==="basic") return 'basic';
  if(l==="intermediate") return 'intermediate';
  return 'advanced';
}

/* ==================== DATA: 30 problems per category ==================== */
/* --- WINDOWS --- */
const DATA_WINDOWS = parseLines(`
Basic|Slow startup|Disable unnecessary startup apps via Task Manager.|Ctrl+Shift+Esc → Startup → Disable
Basic|Wi-Fi not connecting|Reset Winsock & TCP/IP stack then reboot.|netsh winsock reset && netsh int ip reset
Basic|No sound|Set correct output device and restart audio service.|services.msc → Windows Audio → Restart
Basic|Printer offline|Restart Print Spooler and reinstall driver.|net stop spooler && del /Q %systemroot%\\system32\\spool\\PRINTERS\\* && net start spooler
Basic|USB not recognized|Power cycle PC and uninstall unknown USB devices.|devmgmt.msc → Universal Serial Bus → Uninstall → Scan
Basic|Screen flicker|Update/rollback display driver.|devmgmt.msc → Display adapters → Update/Roll Back
Basic|App won’t open|Repair/reset app from Apps & Features.|Settings → Apps → App → Advanced → Repair/Reset
Basic|File won’t delete|Kill locking handle and delete.|handle.exe filename (Sysinternals) then del
Basic|Clock out of sync|Resync Windows Time service.|w32tm /resync
Basic|Blue tint display|Disable Night light / color filter.|Settings → Display → Night light/Color filters off
Intermediate|High CPU by System|Disable unnecessary services; check drivers with LatencyMon.|latencymon
Intermediate|Disk 100% usage|Check for Superfetch/SysMain impact; run chkdsk.|sc stop SysMain && chkdsk C: /f
Intermediate|Windows Update stuck|Reset SoftwareDistribution + Catroot2.|net stop wuauserv bits cryptsvc && rmdir /s /q %windir%\\SoftwareDistribution && rmdir /s /q %windir%\\System32\\catroot2 && net start wuauserv bits cryptsvc
Intermediate|Apps freezing|Check event logs & DEP; update .NET.|eventvwr.msc → Windows Logs → Application
Intermediate|Explorer crashes|Clear thumbnail & icon cache.|ie4uinit.exe -ClearIconCache && del /A /Q %localappdata%\\IconCache.db
Intermediate|System file corruption|Run SFC then DISM.|sfc /scannow && DISM /Online /Cleanup-Image /RestoreHealth
Intermediate|Network unidentified|Flush DNS, reset IP.|ipconfig /flushdns && ipconfig /release && ipconfig /renew
Intermediate|Remote Desktop cannot connect|Allow RDP, check firewall 3389.|System Properties → Remote; wf.msc inbound 3389
Intermediate|BitLocker recovery loop|Suspend & resume protection; repair boot.|manage-bde -protectors -disable C:  && bootrec /RebuildBcd
Intermediate|Black screen after login|Restart shell; disable Fast Startup.|Ctrl+Shift+Esc → File→Run: explorer.exe; powercfg -h off
Advanced|Inaccessible Boot Device|Check storage mode drivers; rebuild BCD.|bcdboot C:\\Windows /s EFI /f ALL
Advanced|BSOD DRIVER_IRQL_NOT_LESS_OR_EQUAL|Update NIC/storage drivers; analyze minidump.|WinDbg: !analyze -v
Advanced|DNS fails intermittently|Set DNS to public and test with nslookup.|nslookup github.com 1.1.1.1
Advanced|Group Policy not applying|Force gpupdate and check rsop.|gpupdate /force && rsop.msc
Advanced|Profile service failed sign-in|Rename/repair profile registry keys.|HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\ProfileList
Advanced|Windows boots to recovery|Check BCD entries and partition flags.|bcdedit /enum all
Advanced|Hyper-V won’t start VM|Disable conflicting virtualization (WSL/VT-x share).|bcdedit /set hypervisorlaunchtype auto
Advanced|File sharing broken|Enable SMB1/2 accordingly and check firewall.|OptionalFeatures.exe → SMB; wf.msc file sharing rules
Advanced|Time drift on domain|Sync with DC and check PDC role.|w32tm /config /syncfromflags:DOMHIER /update && w32tm /resync
Advanced|WSL network broken|Restart LxssManager & reset WSL.|sc stop LxssManager && sc start LxssManager && wsl --shutdown
Advanced|Shadow copies failing|Check VSS writers & free space.|vssadmin list writers
Advanced|Secure Boot state wrong|Check msinfo32 and firmware settings.|msinfo32
`);

/* --- MAC --- */
const DATA_MAC = parseLines(`
Basic|App won’t open|Force quit then reopen.|⌘⌥⎋ → select app → Force Quit
Basic|Beachball freeze|Check Activity Monitor; force quit heavy app.|/Applications/Utilities/Activity\\ Monitor.app
Basic|Bluetooth not connecting|Reset Bluetooth module and remove device.|Shift+Option click Bluetooth icon → Reset
Basic|No sound output|Set Output Device & volume; reset coreaudiod.|sudo killall coreaudiod
Basic|Wi-Fi slow|Forget network, renew DHCP lease.|System Settings → Wi-Fi → Details → Renew Lease
Basic|External drive not mounting|Run First Aid in Disk Utility.|diskutil verifyVolume /Volumes/Drive
Basic|Screenshots not saving|Set default location.|defaults write com.apple.screencapture location ~/Desktop && killall SystemUIServer
Basic|Dock disappears|Restart Dock.|killall Dock
Basic|Trackpad lag|Reset NVRAM/SMC.|Shut down → hold ⌥⌘PR at boot
Basic|Time wrong|Sync time server.|sudo systemsetup -setusingnetworktime on
Intermediate|Update stuck|Delete partial updates; reboot Safe Mode.|/Library/Updates → remove; hold Shift on boot
Intermediate|Spotlight not indexing|Rebuild index.|sudo mdutil -E /
Intermediate|Login items keep returning|Check LaunchAgents/Daemons.|~/Library/LaunchAgents
Intermediate|Kernel_task high CPU|Reset SMC; check sensors and fans.|sudo powermetrics --samplers smc
Intermediate|Fans loud|Reset SMC and clean vents.|SMC reset per model
Intermediate|iCloud Drive not syncing|Toggle drive and relogin.|System Settings → Apple ID → iCloud Drive
Intermediate|App notarization error|Allow app via Security & Privacy.|Security & Privacy → Open Anyway
Intermediate|Printer won’t print|Reset printing system.|System Settings → Printers → right-click → Reset
Intermediate|DNS resolution fail|Set DNS to 1.1.1.1/8.8.8.8, flush cache.|sudo killall -HUP mDNSResponder
Intermediate|External display not detected|Reset NVRAM; check cable; set scaled.|Option-click “Scaled”
Advanced|Kernel panic recurring|Check panic logs & hardware.|log show --predicate 'eventMessage CONTAINS "panic"' --last 1d
Advanced|Disk full by “Other”|Find large folders.|sudo du -hxd1 / | sort -hr | head
Advanced|LaunchServices corruption|Rebuild LS database.|/System/Library/Frameworks/CoreServices.framework/.../lsregister -kill -r -domain local -domain system -domain user
Advanced|Homebrew broken|Doctor & relink.|brew doctor && brew update --force --verbose && brew cleanup
Advanced|FileVault stuck decrypting|Check status and fdesetup logs.|fdesetup status
Advanced|SSH agent issues|Reset keychain SSH and restart agent.|sudo launchctl stop com.openssh.sshd ; start
Advanced|Time Machine failing|List destinations and remove bad snapshots.|tmutil listbackups && tmutil deletelocalsnapshots latest
Advanced|Rosetta missing for ARM|Install Rosetta 2.|softwareupdate --install-rosetta
Advanced|Gatekeeper blocks scripts|Allow xattr and quarantine removal.|xattr -dr com.apple.quarantine myscript.sh
Advanced|Swap thrashing|Check memory pressure; add RAM or close apps.|vm_stat; Activity Monitor → Memory
`);

/* --- LINUX (Debian/Ubuntu leaning, but generic) --- */
const DATA_LINUX = parseLines(`
Basic|Package lists outdated|Update indexes.|sudo apt update
Basic|Time wrong|Enable NTP and sync.|timedatectl set-ntp true && timedatectl status
Basic|Permission denied|Use sudo or fix perms.|sudo chown -R $USER:$USER path
Basic|Command not found|Install package providing command.|apt-cache search <name>
Basic|No network|Restart NetworkManager.|sudo systemctl restart NetworkManager
Basic|DNS fails|Set resolv.conf with systemd-resolved.|resolvectl status; resolvectl dns eth0 1.1.1.1
Basic|External drive not mounting|Mount manually.|sudo mkdir -p /mnt/usb && sudo mount /dev/sdb1 /mnt/usb
Basic|Low disk space|Find largest dirs.|sudo du -hxd1 / | sort -hr | head
Basic|Can’t unzip|Install unzip/tar.|sudo apt install unzip
Basic|Keyboard layout wrong|Reconfigure keyboard.|sudo dpkg-reconfigure keyboard-configuration
Intermediate|Broken packages|Auto-fix deps.|sudo apt --fix-broken install
Intermediate|Held packages|Configure and install.|sudo dpkg --configure -a && sudo apt -f install
Intermediate|Service won’t start|Check logs & status.|sudo systemctl status servicename && journalctl -u servicename
Intermediate|SSH refused|Open port, enable service.|sudo ufw allow 22 && sudo systemctl enable --now ssh
Intermediate|Swap missing|Create and enable.|sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile
Intermediate|Hostname change|Set hostname and hosts.|hostnamectl set-hostname newname
Intermediate|Timezone wrong|Reconfigure tzdata.|sudo dpkg-reconfigure tzdata
Intermediate|Update grub|Regenerate config.|sudo update-grub
Intermediate|Nvidia driver issues|Use tested driver.|ubuntu-drivers autoinstall
Intermediate|Docker permission denied|Add user to docker group.|sudo usermod -aG docker $USER && newgrp docker
Advanced|Kernel panic|Check last logs and hardware.|journalctl -k -b -1 | less
Advanced|Disk errors|Examine SMART.|sudo smartctl -a /dev/sda
Advanced|RAID degraded|Check mdadm status.|cat /proc/mdstat && sudo mdadm --detail /dev/md0
Advanced|Iptables rule lockout|Allow SSH & flush carefully.|sudo iptables -I INPUT -p tcp --dport 22 -j ACCEPT
Advanced|SELinux/AppArmor block|Check denials & profiles.|sudo aa-status && sudo aa-logprof
Advanced|Systemd unit ordering|Add After/Wants in service.|/etc/systemd/system/x.service [Unit]
Advanced|Corrupt filesystem|Run fsck from live.|fsck -f /dev/sda1
Advanced|DNSSEC issues|Disable for testing.|sudo resolvectl dnssec eth0 no
Advanced|LVM full|Extend LV and filesystem.|lvextend -l +100%FREE /dev/vg/lv && resize2fs /dev/vg/lv
Advanced|SSH key issues|Fix perms.|chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys
`);

/* --- ANDROID / iOS --- */
const DATA_MOBILE = parseLines(`
Basic|App keeps crashing|Clear cache/data; update app.|Android: Settings → Apps → Clear cache/data
Basic|Battery drains fast|Disable background refresh; check usage.|iOS: Settings → Battery → Usage
Basic|Wi-Fi drops|Forget and rejoin, reset network settings.|iOS: Settings → General → Transfer/Reset → Reset Network
Basic|Storage full|Offload unused apps, clear media.|Android: Settings → Storage → Clean up
Basic|Bluetooth pairing fails|Toggle Bluetooth and reset pairing.|Forget device → pair again
Basic|Phone overheating|Close heavy apps; remove case while charging.|Check battery stats
Basic|Notifications not showing|Enable app notifications and focus mode.|iOS Focus/Android Do Not Disturb
Basic|Camera black screen|Force stop camera and reboot.|Settings → Apps → Force stop
Basic|GPS inaccurate|Toggle high accuracy/location permissions.|Android: Location → Accuracy
Basic|Play Store/App Store won’t download|Clear store cache or sign out/in.|Android: Clear Google Play cache
Intermediate|Bootloop|Enter recovery; wipe cache; safe mode.|Hold power + volume combo (model-specific)
Intermediate|ADB device unauthorized|Revoke USB debugging authorizations.|Developer options → Revoke → reconnect
Intermediate|iCloud not syncing|Sign out/in; toggle services.|Settings → Apple ID → iCloud
Intermediate|Backup failing|Check free space/network; retry.|Ensure Wi-Fi + power
Intermediate|App stuck installing|Clear package manager cache.|Android: Settings → Apps → Package Installer
Intermediate|MMS not working|Set correct APN.|Carrier APN settings
Intermediate|Black screen on calls|Proximity sensor calibration.|Remove screen protector; test
Intermediate|Keyboard lag|Reset keyboard dictionary.|iOS: Settings → General → Reset Keyboard Dictionary
Intermediate|Face ID/Touch ID fails|Re-enroll biometrics; clean sensors.|Settings → Face ID/Touch ID
Intermediate|RCS/Chat features broken|Toggle RCS and clear carrier services cache.|Android Messages settings
Advanced|Bootloader locked flash|Unlock (wipes data).|fastboot oem unlock (vendor-specific)
Advanced|ADB install fail|Use -r -d flags and correct ABI.|adb install -r -d app.apk
Advanced|Logcat debugging|Filter by tag or PID.|adb logcat -s MyAppTag
Advanced|iOS provisioning profile|Recreate certificate & profile.|Xcode → Signing & Capabilities
Advanced|Battery health degraded|Replace battery; run diagnostics.|Service menu
Advanced|Corrupt system cache|Wipe cache partition.|Recovery → Wipe cache
Advanced|DNS over HTTPS issues|Disable Private DNS/Private Relay to test.|Settings → Wi-Fi options
Advanced|Mobile data no internet|Reset APN; set IPv4/IPv6.|APN protocol settings
Advanced|ADB over Wi-Fi|Pair & connect.|adb pair ip:port && adb connect ip:5555
Advanced|iTunes restore errors|Use DFU mode restore.|Device specific DFU procedure
`);

/* --- TERMINAL (Bash) --- */
const DATA_TERMINAL = parseLines(`
Basic|List files detailed|Use long list with human sizes.|ls -lah
Basic|Find text in files|Recursive grep.|grep -R "pattern" /path
Basic|Count lines in file|wc usage.|wc -l filename
Basic|Show disk usage by dir|du sorted human-readable.|du -hxd1 / | sort -hr | head
Basic|Show running processes|ps with tree.|ps auxf
Basic|Kill process by name|pkill.|pkill -f appname
Basic|Check open ports|ss replacement for netstat.|ss -tulpn
Basic|Tail logs live|Follow file.|tail -f /var/log/syslog
Basic|Create archive|tar gzip.|tar -czf backup.tgz /path
Basic|Extract archive|tar extract.|tar -xzf file.tgz -C /dest
Intermediate|SSH keygen & copy|Generate & push key.|ssh-keygen -t ed25519 && ssh-copy-id user@host
Intermediate|Copy files over SSH|rsync with progress.|rsync -avP src/ user@host:/dest/
Intermediate|Environment vars|Export & persist.|export VAR=1; echo 'export VAR=1' >>~/.bashrc
Intermediate|Cron job edit|crontab usage.|crontab -e
Intermediate|Network speed test|iperf3 client.|iperf3 -c server
Intermediate|Find big files|Find over 1G.|find / -type f -size +1G
Intermediate|Replace text|sed in place.|sed -i 's/old/new/g' file
Intermediate|JSON pretty|jq usage.|cat data.json | jq .
Intermediate|Download file|curl with resume.|curl -C - -O URL
Intermediate|Path issues|Echo and append.|echo $PATH; export PATH=$PATH:/opt/bin
Advanced|Bash script error tracing|Strict mode.|set -Eeuo pipefail; trap 'echo "err:$LINENO"' ERR
Advanced|Parallel commands|xargs -P.|printf '%s\n' a b c | xargs -I{} -P4 bash -c 'echo {}'
Advanced|SSH tunnel|Local port forward.|ssh -L 5432:db:5432 user@host
Advanced|iptables quick allow|Allow temp SSH.|sudo iptables -I INPUT -p tcp --dport 22 -j ACCEPT
Advanced|Systemd service create|Simple unit file.|/etc/systemd/system/app.service
Advanced|Git shallow clone|Speed up.|git clone --depth=1 URL
Advanced|DNS query|dig short answer.|dig +short example.com
Advanced|CPU/mem monitor|htop.|htop
Advanced|Checksum verify|sha256sum.|sha256sum file.iso
Advanced|SSH config multiplexing|Faster connections.|~/.ssh/config: ControlMaster auto
`);

/* --- POWERSHELL --- */
const DATA_PS = parseLines(`
Basic|List services|Get running services.|Get-Service | Where-Object {$_.Status -eq 'Running'}
Basic|Disk usage|List drives and free space.|Get-PSDrive -PSProvider FileSystem
Basic|Get IP info|Net adapter addresses.|Get-NetIPAddress | Format-Table
Basic|List processes|Sorted by CPU.|Get-Process | Sort CPU -desc | Select -First 10
Basic|Stop process|Kill by name.|Stop-Process -Name notepad -Force
Basic|Find files|Recursive filter.|Get-ChildItem -Recurse -Filter *.log
Basic|Read event logs|Last 50 errors.|Get-EventLog -LogName System -EntryType Error -Newest 50
Basic|Set execution policy|Allow scripts current user.|Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
Basic|Zip folder|Compress-Archive usage.|Compress-Archive -Path .\\src -DestinationPath build.zip
Basic|Unzip|Expand zip.|Expand-Archive build.zip -DestinationPath .\\out
Intermediate|Export users to CSV|Local users export.|Get-LocalUser | Export-Csv users.csv -NoTypeInformation
Intermediate|List startup apps|Registry locations.|Get-CimInstance Win32_StartupCommand | Select Name, Command
Intermediate|Network reset|Release/renew & flush.|ipconfig /release; ipconfig /renew; ipconfig /flushdns
Intermediate|Scheduled task create|Daily at 9.|Register-ScheduledTask -Action (New-ScheduledTaskAction -Execute 'notepad.exe') -Trigger (New-ScheduledTaskTrigger -Daily -At 9am) -TaskName "Note"
Intermediate|Firewall allow port|Open TCP 8080.|New-NetFirewallRule -DisplayName "App8080" -Direction Inbound -Protocol TCP -LocalPort 8080 -Action Allow
Intermediate|Get Windows version|Release info.|Get-ComputerInfo | Select-Object WindowsProductName,WindowsVersion,OsHardwareAbstractionLayer
Intermediate|Check updates|Install updates module.|Install-Module PSWindowsUpdate; Get-WindowsUpdate
Intermediate|File hash|Compute SHA256.|Get-FileHash file.iso -Algorithm SHA256
Intermediate|Replace text|Set-Content with -replace.|(Get-Content file.txt) -replace 'old','new' | Set-Content file.txt
Intermediate|Remote PS session|Enter-PSSession.|Enter-PSSession -ComputerName server
Advanced|Bulk local user ops|Disable inactive >90d.|Search-ADAccount -AccountInactive -TimeSpan 90.00:00:00 | Disable-ADAccount
Advanced|BitLocker status|Drive protection.|Manage-bde -status
Advanced|Repair component store|DISM restore.|DISM /Online /Cleanup-Image /RestoreHealth
Advanced|SFC scan|System file check.|sfc /scannow
Advanced|DNS cache view|Show entries.|Get-DnsClientCache
Advanced|TLS/SSL test|Invoke-WebRequest with SslProtocol.|[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Advanced|Audit installed software|Registry & WMI.|Get-ItemProperty HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\* | Select DisplayName, DisplayVersion
Advanced|Export event log to EVTX|Save to file.|wevtutil epl System .\\system.evtx
Advanced|Registry backup|Export key.|reg export HKLM\\SOFTWARE backup.reg /y
`);

/* --- CMD --- */
const DATA_CMD = parseLines(`
Basic|Show IP config|Display adapters.|ipconfig /all
Basic|Ping test|Connectivity test.|ping 8.8.8.8
Basic|Traceroute|Path to host.|tracert google.com
Basic|DNS flush|Clear cache.|ipconfig /flushdns
Basic|List tasks|Process list.|tasklist
Basic|Kill task|Force terminate.|taskkill /IM app.exe /F
Basic|Copy files|Robust copy.|xcopy C:\\src C:\\dst /E /H /I /Y
Basic|Check disk|File system check.|chkdsk C: /f
Basic|Disk usage by folder|DU tool.|du -q -l 1 C:\\
Basic|System info|Version & build.|systeminfo
Intermediate|Route table|Display & add route.|route print; route add 10.0.0.0 mask 255.255.255.0 10.0.0.1
Intermediate|Netstat|Open ports with PID.|netstat -ano
Intermediate|Nslookup|Name resolution.|nslookup example.com
Intermediate|ARPs|Show ARP cache.|arp -a
Intermediate|Power plan|Set High Performance.|powercfg /S SCHEME_MIN
Intermediate|WMIC query|Installed hotfixes.|wmic qfe list brief
Intermediate|Schtasks|Create scheduled task.|schtasks /Create /SC DAILY /TN Note /TR notepad.exe /ST 09:00
Intermediate|BCDEdit view|Boot entries.|bcdedit /enum
Intermediate|Driver query|Signed state.|driverquery /v
Intermediate|System Restore|Create restore point.|wmic.exe /Namespace:\\\\root\\default Path SystemRestore Call CreateRestorePoint "Manual", 100, 7
Advanced|DISM repair|Restore health.|DISM /Online /Cleanup-Image /RestoreHealth
Advanced|SFC|System file check.|sfc /scannow
Advanced|Bootrec|Repair boot records.|bootrec /fixmbr & bootrec /fixboot & bootrec /rebuildbcd
Advanced|Take ownership|Files/folders.|takeown /F path /R /D Y && icacls path /grant administrators:F /T
Advanced|Netsh firewall|Open port.|netsh advfirewall firewall add rule name="App8080" dir=in action=allow protocol=TCP localport=8080
Advanced|Cipher wipe free space|Secure delete free space.|cipher /w:C:
Advanced|Audit shares|List sessions and shares.|net session & net share
Advanced|Task scheduler export|Backup task XML.|schtasks /Query /XML ONE > one.xml
Advanced|BITS jobs|List/clear transfers.|bitsadmin /list /allusers & bitsadmin /reset /allusers
Advanced|PsExec remote|Run process remotely.|psexec \\\\server -s cmd.exe
`);

/* Bundle all */
const DATA = {
  windows: DATA_WINDOWS,
  mac: DATA_MAC,
  linux: DATA_LINUX,
  android: DATA_MOBILE,
  terminal: DATA_TERMINAL,
  powershell: DATA_PS,
  cmd: DATA_CMD
};

/* ==================== Build Cards ==================== */
function buildStrip(cat, listId){
  const container = document.getElementById(listId);
  container.innerHTML = ""; // clear
  DATA[cat].forEach(item=>{
    const card = document.createElement("article");
    card.className = "problem-card";
    card.innerHTML = `
      <div class="problem-meta">
        <span class="badge ${badge(item.level)}">${item.level}</span>
        <span style="opacity:.6">${cat.toUpperCase()}</span>
      </div>
      <h3 class="problem-title">${item.title}</h3>
      <p style="opacity:.8;font-size:.95rem">${item.solution}</p>
      <button class="problem-open" aria-label="Open solution">
        <i class="fa-solid fa-lightbulb"></i> View Solution
      </button>
    `;
    card.querySelector(".problem-open").addEventListener("click",()=>openModal(item));
    container.appendChild(card);
  });
}
buildStrip("windows","list-windows");
buildStrip("mac","list-mac");
buildStrip("linux","list-linux");
buildStrip("android","list-android");
buildStrip("terminal","list-terminal");
buildStrip("powershell","list-powershell");
buildStrip("cmd","list-cmd");

/* ==================== Category Switcher ==================== */
document.querySelectorAll(".cat-tab").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".cat-tab").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    const cat = btn.dataset.cat;
    document.querySelectorAll(".problem-strip").forEach(s=>s.classList.remove("visible"));
    document.getElementById(`list-${cat}`).classList.add("visible");
    // smooth scroll into view
    document.querySelector(".problems-area").scrollIntoView({behavior:"smooth",block:"start"});
  });
});

/* ==================== Modal ==================== */
const modal = document.getElementById("solution-modal");
const modalTitle = document.getElementById("modal-title");
const modalSolution = document.getElementById("modal-solution");
const modalCode = document.getElementById("modal-code");
const modalClose = document.querySelector(".modal-close");

function openModal(item){
  modalTitle.textContent = item.title + ` (${item.level})`;
  modalSolution.textContent = item.solution;
  modalCode.textContent = item.code || "";
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden","false");
}
function closeModal(){
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden","true");
}
modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e)=>{ if(e.target===modal) closeModal(); });
document.addEventListener("keydown", (e)=>{ if(e.key==="Escape" && !modal.classList.contains("hidden")) closeModal(); });

/* ==================== Small UX niceties ==================== */
// Touch-friendly horizontal wheel scrolling
document.querySelectorAll(".problem-strip").forEach(strip=>{
  strip.addEventListener("wheel",(e)=>{
    if(Math.abs(e.deltaY)>Math.abs(e.deltaX)){ strip.scrollLeft += e.deltaY; e.preventDefault(); }
  }, {passive:false});
});

document.querySelectorAll(".cards-section").forEach(section => {
  const wrapper = section.querySelector(".cards-wrapper");
  const leftBtn = section.querySelector(".scroll-btn.left");
  const rightBtn = section.querySelector(".scroll-btn.right");

  leftBtn.addEventListener("click", () => {
    wrapper.scrollBy({ left: -300, behavior: "smooth" });
  });

  rightBtn.addEventListener("click", () => {
    wrapper.scrollBy({ left: 300, behavior: "smooth" });
  });
});


