import { getCreateAccountInstruction } from "@solana-program/system";
import { 
    findAssociatedTokenPda, 
    getCreateAssociatedTokenIdempotentInstructionAsync, 
    getInitializeMintInstruction, 
    getMintSize, 
    getMintToInstruction, 
    TOKEN_PROGRAM_ADDRESS 
} from "@solana-program/token";
import {
    airdropFactory,
    createSolanaRpc,
    createSolanaRpcSubscriptions,
    generateKeyPairSigner,
    lamports,
    sendAndConfirmTransactionFactory,
    pipe,
    createTransactionMessage,
    setTransactionMessageLifetimeUsingBlockhash,
    signTransactionMessageWithSigners,
    getSignatureFromTransaction,
    setTransactionMessageFeePayerSigner,
    appendTransactionMessageInstructions,
    CompilableTransactionMessage,
    TransactionMessageWithBlockhashLifetime,
    Commitment,
} from "@solana/kit";

const LAMPORTS_PER_SOL = BigInt(1_000_000_000);
const DECIMALS = 9;
const DROP_AMOUNT = 100;