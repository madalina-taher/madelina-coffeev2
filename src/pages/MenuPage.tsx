import React, { useState, useEffect, useRef } from 'react';
import menuData from '../data/menu.json';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { X } from 'lucide-react';

const MenuPage = () => {
  const plats = menuData?.plats || [];
  const categories = Array.from(new Set(plats.map((item: any) => item.category)));
  const [activeCategory, setActiveCategory] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

  useEffect(() => {
    if (tabsRef.current) {
      const activeBtn = tabsRef.current.querySelector('[data-active="true"]') as HTMLButtonElement;
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [activeCategory]);

  const filteredItems = plats.filter((item: any) => item.category === activeCategory);

  if (plats.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen font-display text-madelina-navy/30">
        Chargement de la carte Madelina...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow pt-28 pb-20 relative overflow-hidden">
        {/* Decorative background text */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-[0.02] flex items-center justify-center">
          <span className="text-[30vw] font-display whitespace-nowrap select-none">MADELINA</span>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 px-6">
          {/* Title */}
          <div className="text-center mb-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl mb-6 font-display text-madelina-navy"
            >
              La Carte <span className="text-madelina-terracotta italic font-display">Madelina</span>
            </motion.h2>
            <div className="h-1 w-24 bg-madelina-terracotta mx-auto" />
          </div>

          {/* ─── Category Tabs — horizontally scrollable on mobile ─── */}
          {categories.length > 0 && (
            <div
              ref={tabsRef}
              className="flex gap-2 mb-10 overflow-x-auto pb-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {/* center wrapper on desktop */}
              <div className="flex gap-2 mx-auto flex-nowrap md:flex-wrap md:justify-center">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    data-active={activeCategory === cat ? 'true' : 'false'}
                    onClick={() => setActiveCategory(cat)}
                    className={`relative shrink-0 px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
                      activeCategory === cat
                        ? 'bg-madelina-navy text-white shadow-lg'
                        : 'text-madelina-navy/60 hover:text-madelina-terracotta border border-madelina-navy/10 bg-white'
                    }`}
                  >
                    {activeCategory === cat && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-madelina-navy rounded-full"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-10">{cat}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ─── Grid ─── */}
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item: any, index: number) => (
                <motion.div
                  key={`${item.title}-${index}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                  onClick={() => setSelectedItem(item)}
                  className="group cursor-pointer rounded-[1.8rem] overflow-hidden bg-white border border-madelina-terracotta/8 shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  {/* Image — smaller height */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Price badge */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-md">
                      <span className="font-bold text-madelina-terracotta text-xs tracking-tight">
                        {typeof item.price === 'number' ? item.price.toFixed(3) : item.price} DT
                      </span>
                    </div>
                    {/* Bottom fade */}
                    <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent" />
                  </div>

                  {/* Info */}
                  <div className="px-4 pb-4 pt-2">
                    <h3 className="text-sm md:text-base font-display text-madelina-navy group-hover:text-madelina-terracotta transition-colors leading-snug line-clamp-2">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-[11px] text-madelina-navy/45 mt-1 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      {/* ─── Item Detail Modal — bottom sheet, NO commander button ─── */}
      <AnimatePresence>
        {selectedItem && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            />
            {/* Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-[2.5rem] overflow-hidden shadow-2xl max-w-lg mx-auto"
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 bg-madelina-navy/10 rounded-full" />
              </div>

              {/* Close btn */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-madelina-navy/8 flex items-center justify-center text-madelina-navy/40 hover:bg-madelina-navy/15 transition-colors"
              >
                <X size={16} />
              </button>

              {/* Image */}
              <div className="relative h-52 overflow-hidden mx-4 rounded-2xl mt-2">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                  <h2 className="text-white font-display text-xl leading-tight drop-shadow">
                    {selectedItem.title}
                  </h2>
                  <span className="bg-white text-madelina-terracotta font-bold text-xs px-3 py-1.5 rounded-full shadow-lg ml-2 shrink-0">
                    {typeof selectedItem.price === 'number' ? selectedItem.price.toFixed(3) : selectedItem.price} DT
                  </span>
                </div>
              </div>

              {/* Info — no commander button */}
              <div className="px-5 py-5 pb-10">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-madelina-terracotta mb-3">
                  {selectedItem.category}
                </p>
                <p className="text-madelina-navy/70 text-sm leading-relaxed">
                  {selectedItem.description || 'Une délicieuse création artisanale de notre Atelier Madelina.'}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default MenuPage;