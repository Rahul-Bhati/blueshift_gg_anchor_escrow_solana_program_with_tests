import {before , describe, test, it} from "node:test";
import assert from "node:assert";

import * as ProgramClient from "../clients/generated/js/src";
import { getEscrowDecoder, ESCROW_DISCRIMINATOR } from "../clients/generated/js/src"; // get_program_name_decoder and discr

import { type KeyPairSigner, type Address, MaybeAccount } from "@solana/kit";
import { connect, Connection } from "solana-kite";

// to stringify and handling big Int values
export const log = console.log;
export const stringify = (object: any) => {
    const bigIntReplacer = (key: string, value: any) => typeof value === "bigint" ? value.toString() : value;
    return JSON.stringify(object, bigIntReplacer, 2);
}

describe('election', () => { 
    // configure the client to use a local cluster
    let alice: KeyPairSigner;
    let bob: KeyPairSigner;
    let escrow: Address;
    let connection: Connection;
    let createEscrow: 

    before(async() => {
        // connect to local cluster
    });

    test("Alice make request", async() => {});

    test("bob take request", async() => {});

    test("Alice refund request", async() => {});

 })
