#!/bin/bash
set -e

echo "=== Berry Platform Installer ==="

# -------- CONFIG (EDIT THESE) --------
PLATFORM_USER="${PLATFORM_USER:-berry}"
PLATFORM_HOME="/opt/berry-platform"
VAULT_PATH="/mnt/chromeos/removable/Berry02"   # or /data/berry-vault on host
NODE_BIN="/usr/bin/node"

DX_MODULE_SRC="/path/to/Dex_model"             # where your DX module lives now
RPC_MODULE_SRC="/path/to/rpc_health_module"    # where your RPC module lives now

CRON_FILE="/etc/cron.d/berry-platform"
# -------------------------------------

echo "[1/6] Creating platform directories..."

sudo mkdir -p "$PLATFORM_HOME/subsystems/dx_terminal"
sudo mkdir -p "$PLATFORM_HOME/subsystems/rpc_health"
sudo mkdir -p "$PLATFORM_HOME/logs"
sudo mkdir -p "$PLATFORM_HOME/config"
sudo mkdir -p "$VAULT_PATH"

sudo chown -R "$PLATFORM_USER":"$PLATFORM_USER" "$PLATFORM_HOME" "$VAULT_PATH"

echo "[2/6] Copying subsystem modules..."

sudo cp -r "$DX_MODULE_SRC/"* "$PLATFORM_HOME/subsystems/dx_terminal/"
sudo cp -r "$RPC_MODULE_SRC/"* "$PLATFORM_HOME/subsystems/rpc_health/"

echo "[3/6] Installing combined manifest..."

if [ -f "./BERRY_PLATFORM_COMBINED_MANIFEST.json" ]; then
  sudo cp "./BERRY_PLATFORM_COMBINED_MANIFEST.json" "$PLATFORM_HOME/config/BERRY_PLATFORM_COMBINED_MANIFEST.json"
else
  echo "WARNING: Combined manifest not found in current directory."
fi

echo "[4/6] Writing environment template..."

cat <<EOF | sudo tee "$PLATFORM_HOME/config/env.example" >/dev/null
# Berry Platform Environment

# RPC providers
ETHEREUM_RPC=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
ALCHEMY_BASE_RPC=https://base-mainnet.g.alchemy.com/v2/YOUR_KEY
BASE_FALLBACK_RPC=https://mainnet.base.org

# Vault path
BERRY_VAULT_PATH=$VAULT_PATH
EOF

echo "[5/6] Installing cron entries..."

sudo bash -c "cat > $CRON_FILE" <<EOF
# Berry Platform cron jobs

# DX Terminal orchestrator (every 4 hours)
0 */4 * * * $PLATFORM_USER $NODE_BIN $PLATFORM_HOME/subsystems/dx_terminal/dx_terminal_orchestrator.js >> $PLATFORM_HOME/logs/dx_terminal_orchestrator.log 2>&1

EOF

sudo chmod 644 "$CRON_FILE"

echo "[6/6] Summary"
echo "  Platform home:      $PLATFORM_HOME"
echo "  Vault path:         $VAULT_PATH"
echo "  DX module:          $PLATFORM_HOME/subsystems/dx_terminal"
echo "  RPC module:         $PLATFORM_HOME/subsystems/rpc_health"
echo "  Combined manifest:  $PLATFORM_HOME/config/BERRY_PLATFORM_COMBINED_MANIFEST.json"
echo "  Cron file:          $CRON_FILE"
echo
echo "Next steps:"
echo "  1) Copy env.example to env and fill in real RPC keys."
echo "  2) Ensure RPC health route is wired into your main server."
echo "  3) Tail logs in $PLATFORM_HOME/logs once cron starts running."
echo
echo "Berry Platform installer complete."