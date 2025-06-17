import {before , describe, test } from "node:test";
import assert from "node:assert";

import * as ProgramClient from "../dist/js-client";
import { getEscrowDecoder, ESCROW_DISCRIMINATOR } from "../dist/js-client"; // get_program_name_decoder and discr

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
    // let createEscrow: ;

    before(async() => {
        // connect to local cluster
        connection = await connect();
        [alice, bob] = await connection.createWallets(2);

        // initalize escrow pda
        const escrowBumpAndPda = await connection.getPDAAndBump(ProgramClient.BLUESHIFT_ANCHOR_ESCROW_PROGRAM_ADDRESS, ["escrow", alice.address, "seedle"]);

        // we need to get ata for the escrow -> vault where we store maker(alice) amount etc
        
    });

    test("Alice make request", async() => {});

    test("bob take request", async() => {});

    test("Alice refund request", async() => {});

 })
