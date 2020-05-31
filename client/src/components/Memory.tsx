import React, { useEffect, useRef } from "react";

function Memory() {
    const memoryRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const ctx = memoryRef.current?.getContext("2d");
        if (ctx) {
            let size = 50,
                x = 50,
                y = 44;
            ctx.beginPath();
            // ctx.moveTo(100, 100);
            ctx.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));

            for (let side = 0; side < 7; side++) {
                ctx.lineTo(
                    x + size * Math.cos((side * 2 * Math.PI) / 6),
                    y + size * Math.sin((side * 2 * Math.PI) / 6)
                );
            }

            // ctx.fillStyle = "#333333";
            ctx.stroke();
        }
    }, []);

    return (
        <div>
            <canvas
                id="memory"
                width="100"
                height="88"
                ref={memoryRef}
            ></canvas>
        </div>
    );
}

export default Memory;
