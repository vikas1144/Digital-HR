import React from 'react';
import { Button } from './Button';

function CTA() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your HR Experience?</h2>
      <p className="text-lg mb-6">Join 1000+ companies already using DigitalHR Pro</p>
      <Button className="bg-white text-blue-700 hover:bg-blue-100">
        Try Free Demo
      </Button>
    </section>
  );
}

export default CTA;