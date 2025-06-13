use anchor_lang::prelude::*;

#[derive(InitSpace)]
#[account(discriminator=1)]
pub struct Escrow{
    pub seed: u64, // so that user can create multiple escrow and store it on chain so it become easy to re-derive it
    pub maker: Pubkey, // who going to create this escrow
    pub mint_a: Pubkey, // token a add (want to give)
    pub mint_b: Pubkey, // token b (want in return)
    pub receive: u64, // amount of token b user want
    pub bump: u8 // bump storing onchain to cut off the cost of cpu/power use req to derive bump each time
}