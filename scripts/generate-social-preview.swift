// Run: swift -module-cache-path /tmp/janvi-swift-cache scripts/generate-social-preview.swift
import AppKit
let size = NSSize(width: 1200, height: 630)
let bitmap = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: 1200, pixelsHigh: 630,
    bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false,
    colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
NSGraphicsContext.saveGraphicsState()
NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: bitmap)
NSColor(calibratedRed: 1, green: 0.961, blue: 0.976, alpha: 1).setFill()
NSBezierPath(rect: NSRect(origin: .zero, size: size)).fill()
let pink = NSColor(calibratedRed: 0.745, green: 0.094, blue: 0.365, alpha: 1)
pink.setFill()
NSBezierPath(rect: NSRect(x: 0, y: 0, width: 1200, height: 28)).fill()
func text(_ string: String, _ rect: NSRect, _ size: CGFloat, _ color: NSColor, _ weight: NSFont.Weight = .regular) {
    (string as NSString).draw(in: rect, withAttributes: [.font: NSFont.monospacedSystemFont(ofSize: size, weight: weight), .foregroundColor: color])
}
text("Hello, I’m", NSRect(x: 90, y: 430, width: 1020, height: 60), 36, pink)
text("Janvi.", NSRect(x: 82, y: 255, width: 1040, height: 170), 134, pink, .bold)
text("Strategy, marketing & writing", NSRect(x: 90, y: 185, width: 1020, height: 55), 38, .darkGray)
text("A little corner of the internet.", NSRect(x: 90, y: 95, width: 1020, height: 45), 25, pink)
NSGraphicsContext.restoreGraphicsState()
try bitmap.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: "static/social-preview.png"))
