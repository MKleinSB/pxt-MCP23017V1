/**
 *  MCP23017-Interfacefunktionen
 */
// Basierend auf der tollen Grundlagenseite 
// http://robert-fromm.info/?post=elec_i2c_calliope
// (cc) Creative Commons Robert Fromm 2017
// Als Makecode / pxt-Paket 04.10.2018 M.Klein v3.07
// https://www.hackster.io/MKlein/calliope-mini-i2c-io-expander-ffda4d

enum REG_MCP {
    //% Bitmuster um Register A zu beschreiben
    Bitmuster_A = 0x12,
    //% Bitmuster um Register B zu beschreiben
    Bitmuster_B = 0x13,
    //% Aus- / Eingaberichtung des Registers A
    EinOderAusgabe_A = 0x00, //Register stehen standardmäßig auf Eingabe (1111 1111)
    //% Aus- / Eingaberichtung des Registers B
    EinOderAusgabe_B = 0x01,
    //% Pullup Widerstände Register A
    PullUp_Widerstaende_A = 0x0C,
    //% Pullup Widerstände Register B
    PullUp_Widerstaende_B = 0x0D
}

enum ADDRESS {                // Adresse des MCP23017
    //% block=0x20
    A20 = 0x20,               // Standardwert
    //% block=0x21
    A21 = 0x21,               // 
    //% block=0x22
    A22 = 0x22,               // 
    //% block=0x23
    A23 = 0x23,               // 
    //% block=0x24
    A24 = 0x24,               // 
    //% block=0x25
    A25 = 0x25,               // 
    //% block=0x26
    A26 = 0x26,               // 
    //% block=0x27
    A27 = 0x27                // 
}
enum BITS {                    //
    //% block=11111111
    Alle = 0xff,               // 
    //% block=00000000
    keiner = 0x00,             // 
    //% block=00000001
    Bit1 = 0x01,               // 
    //% block=00000010
    Bit2 = 0x02,               // 
    //% block=00000100
    Bit3 = 0x04,               // 
    //% block=00001000
    Bit4 = 0x08,               // 
    //% block=00010000
    Bit5 = 0x10,               // 
    //% block=00100000
    Bit6 = 0x20,                // 
    //% block=01000000
    Bit7 = 0x40,                // 
    //% block=10000000
    Bit8 = 0x80                 // 

}
/**
 * Benutzerdefinierte Blöcke
 */
//% weight=100 color=#0fbc11 icon="\uf2db"

namespace MCP23017 {
    /**
     * Schreibt in ein Register einen bestimmten Bitwert
     * addr: Adresse des MCP23017 (Standard 0x20)
     * reg: Register
     * value: Bitmuster als Dezimalzahl
     */
    //% blockId=Schreiberegister block="Beschreibe an Adresse %addr|das Register %reg|mit dem Wert %value"
    export function writeRegister(addr: ADDRESS, reg: REG_MCP, value: number) {
        pins.i2cWriteNumber(addr, reg * 256 + value, NumberFormat.UInt16BE)
    }

    /**
     * Liest aus Register einen bestimmten Bitwert,
     * verknüpft ihn mit einem Bitmuster und gibt 
     * "Wahr" zurück wenn die Bits gesetzt sind.
     * addr: Adresse des MCP23017 (Standard 0x20)
     * reg: Register
     * value: Bitmuster als Dezimalzahl
     * return: wahr oder falsch
     */

    //% blockId=LiesRegisterNAND block="Lies von Adresse %addr|das Register %reg|und verknüpfe es mit Bitwert %value"
    export function ReadNotAnd(addr: ADDRESS, reg: REG_MCP, value: number): boolean {
        return (!(MCP23017.readRegister(addr, reg) & value))
    }

    /**
     * Bitwert für  alle Ein- bzw. Ausgänge zum auswählen
     */
    //% blockId=alle block="%alle"
    //% gesture.fieldEditor="gridpicker"
    //% gesture.fieldOptions.width=220
    //% gesture.fieldOptions.columns=3
    export function bitwert(alle: BITS): number {
        return alle
    }

    //% blockId=LiesRegister block="Lies von Adresse %addr|das Register %reg| aus"
    export function readRegister(addr: ADDRESS, reg: REG_MCP): number {
        pins.i2cWriteNumber(addr, reg, NumberFormat.Int8LE);
        return pins.i2cReadNumber(addr, NumberFormat.Int8LE)
    }
}