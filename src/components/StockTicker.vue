<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const tickers = ref([
  {
    symbol: 'NANO',
    name: 'NanoDigital',
    price: 18.42,
    changePct: -80.42,
    status: 'HALTED',
  },
  {
    symbol: 'DJIA',
    name: 'Dow Jones',
    price: 11402.18,
    changePct: -14.84,
  },
  {
    symbol: 'USDEF',
    name: 'Defense Index',
    price: 612.4,
    changePct: 9.74,
  },
  {
    symbol: 'FUJI',
    name: 'Fujisan',
    price: 146.3,
    changePct: -12.85,
  },
  {
    symbol: 'MLTC',
    name: 'Militech',
    price: 278.9,
    changePct: -7.14,
  },
  {
    symbol: 'ZHNG',
    name: 'ZhengIO',
    price: 94.55,
    changePct: -16.4,
  },
  {
    symbol: 'FLGN',
    name: 'ForeignLegion',
    price: 118.2,
    changePct: -9.32,
  },
  {
    symbol: 'VRGE',
    name: 'Verge',
    price: 63.8,
    changePct: -13.75,
  },
  {
    symbol: 'PCHEM',
    name: 'Petrochem',
    price: 214.6,
    changePct: -11.24,
  },
  {
    symbol: 'MRDN',
    name: 'Meridian Cap',
    price: 31.85,
    changePct: -19.31,
  },
  {
    symbol: 'BARM',
    name: 'Budget Arms',
    price: 42.1,
    changePct: -8.15,
  },
  {
    symbol: 'N54',
    name: 'Network 54',
    price: 104.3,
    changePct: -5.6,
  },
])

function formatPrice(value) {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

function formatChange(pct) {
  const sign = pct > 0 ? '+' : ''
  return `${sign}${pct.toFixed(2)}%`
}

let timerId = null

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  timerId = window.setInterval(() => {
    const activeIndices = tickers.value
      .map((item, idx) => (item.status === 'HALTED' ? -1 : idx))
      .filter((idx) => idx !== -1)

    const pick = activeIndices[Math.floor(Math.random() * activeIndices.length)]
    const item = tickers.value[pick]
    if (!item) return

    const deltaPct = (Math.random() - 0.5) * 0.24
    item.price = Math.max(0.01, +(item.price * (1 + deltaPct / 100)).toFixed(2))
    item.changePct = +(item.changePct + deltaPct).toFixed(2)
  }, 2600)
})

onUnmounted(() => {
  if (timerId !== null) clearInterval(timerId)
})
</script>

<template>
  <section class="stock-ticker" aria-label="Network 54 Live Market Ticker">
    <div class="ticker-badge">
      <span class="live-dot" aria-hidden="true"></span>
      <span class="badge-label">N54 MARKETS</span>
    </div>

    <div class="ticker-viewport">
      <div class="ticker-track">
        <div
          v-for="copy in 2"
          :key="copy"
          class="ticker-group"
          :aria-hidden="copy === 2 ? 'true' : undefined"
        >
          <div
            v-for="item in tickers"
            :key="`${copy}-${item.symbol}`"
            class="ticker-item"
          >
            <span class="ticker-symbol">{{ item.symbol }}</span>
            <span class="ticker-name">{{ item.name }}</span>
            <span class="ticker-price">{{ formatPrice(item.price) }}</span>
            <span
              class="ticker-change"
              :class="item.changePct >= 0 ? 'is-up' : 'is-down'"
            >
              <span aria-hidden="true">{{ item.changePct >= 0 ? '▲' : '▼' }}</span>
              {{ formatChange(item.changePct) }}
            </span>
            <span v-if="item.status" class="ticker-status">{{ item.status }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.stock-ticker {
  display: flex;
  align-items: center;
  background-color: #040b06;
  border-top: 1px solid #142218;
  border-bottom: 1px solid #142218;
  font-size: 0.82rem;
  letter-spacing: 0.03em;
  overflow: hidden;
  user-select: none;
}

.ticker-badge {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.65rem 1rem;
  background-color: #09180e;
  border-right: 1px solid #142218;
  color: #2ee66b;
  font-weight: 700;
  text-transform: uppercase;
  white-space: nowrap;
  z-index: 2;
}

.live-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #ff4d4f;
  box-shadow: 0 0 8px rgba(255, 77, 79, 0.85);
  animation: pulse-dot 1.6s ease-in-out infinite;
}

.ticker-viewport {
  flex: 1 1 auto;
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent 0, #000 28px, #000 calc(100% - 28px), transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0, #000 28px, #000 calc(100% - 28px), transparent 100%);
}

.ticker-track {
  display: flex;
  width: max-content;
  will-change: transform;
  animation: ticker-scroll 58s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
}

.ticker-group {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.ticker-item {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.65rem 1.25rem;
  border-right: 1px solid #142218;
  color: #d8e6dc;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}

.ticker-symbol {
  font-weight: 700;
  color: #ffffff;
}

.ticker-name {
  color: #7d9685;
  font-size: 0.76rem;
}

.ticker-price {
  color: #cfe0d4;
}

.ticker-change {
  font-weight: 700;

  &.is-up {
    color: #00c853;
  }

  &.is-down {
    color: #ff5252;
  }
}

.ticker-status {
  padding: 0.05rem 0.35rem;
  border: 1px solid rgba(255, 82, 82, 0.55);
  border-radius: 2px;
  background-color: rgba(255, 82, 82, 0.14);
  color: #ff7b7b;
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}

@keyframes ticker-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@keyframes pulse-dot {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.35;
  }
}

@media (max-width: 575.98px) {
  .ticker-badge {
    padding: 0.6rem 0.7rem;
  }

  .ticker-name {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .live-dot {
    animation: none;
  }

  .ticker-viewport {
    overflow-x: auto;
    mask-image: none;
    -webkit-mask-image: none;
  }

  .ticker-track {
    animation: none;
  }

  .ticker-group[aria-hidden='true'] {
    display: none;
  }
}
</style>
