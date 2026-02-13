"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const doors = [
  { id: 1, color: 'bg-emerald-800', label: 'Tür 1' },
  { id: 2, color: 'bg-amber-800', label: 'Tür 2' },
  { id: 3, color: 'bg-rose-800', label: 'Tür 3' },
];

export default function ImmersiveDoors() {
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [content, setContent] = useState("");

  const openDoor = (id) => {
    setSelectedDoor(id);
    // Hier würdest du später deine KI-API aufrufen
    const results = [
      "Witz: Warum stehen Pilze im Wald? Weil die Tannen zapfen!",
      "Aufgabe: Mache 10 Liegestütze oder finde etwas Blaues im Raum.",
      "Witz: Was ist grün und klopft an die Tür? Ein Klopfsalat!"
    ];
    setContent(results[id - 1]);
  };

  return (
    <main className="h-screen w-full bg-slate-950 flex items-center justify-center overflow-hidden text-white font-sans">
      <AnimatePresence mode="wait">
        {!selectedDoor ? (
          // DIE TÜR-AUSWAHL
          <motion.div 
            key="selection"
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex gap-8"
          >
            {doors.map((door) => (
              <motion.div
                key={door.id}
                whileHover={{ scale: 1.05, translateY: -10 }}
                onClick={() => openDoor(door.id)}
                className={`${door.color} w-40 h-64 rounded-t-full border-4 border-yellow-600/30 cursor-pointer flex items-end justify-center pb-8 shadow-2xl shadow-black`}
              >
                <span className="text-sm uppercase tracking-widest font-bold">{door.label}</span>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // DER INHALT (Nach dem Zoom)
          <motion.div
            key="content"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-md text-center p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-lg"
          >
            <h2 className="text-2xl mb-4 font-light tracking-wide">Dein Schicksal:</h2>
            <p className="text-xl text-gray-300 italic">"{content}"</p>
            <button 
              onClick={() => setSelectedDoor(null)}
              className="mt-12 text-xs uppercase tracking-widest border-b border-white/40 pb-1 hover:text-yellow-500 transition-colors"
            >
              Zurück zu den Türen
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ZOOM OVERLAY EFFEKT */}
      <AnimatePresence>
        {selectedDoor && (
          <motion.div
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 15, opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          >
             <div className={`w-40 h-64 rounded-t-full ${doors[selectedDoor-1].color}`} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
