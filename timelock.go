package main

import (
	"bytes"
	"log"
	"time"

	"github.com/drand/tlock"
	"github.com/drand/tlock/networks/http"
)

func main() {

	// Specify how long we need to wait before the file can be decrypted.
	duration := 10 * time.Second

	input := "Hello World!"

	cipherData, err := encryptData(duration, input)
	if err != nil {
		log.Fatalf("encryptData: %s", err)
	}
	println("Encrypted Data!")
	// Wait for the duration to pass.
	time.Sleep(duration)

	msg, err := decryptData(cipherData)
	if err != nil {
		log.Fatalf("decryptData: %s", err)
	}
	println("Message: " + msg)

}

func encryptData(duration time.Duration, input string) (*bytes.Buffer, error) {

	// Open an io.Reader to the data to be encrypted.
	// in, err := os.Open("data.txt")
	// if err != nil {
	// 	log.Fatalf("open: %s", err)
	// 	return &bytes.Buffer{}, err
	// }
	// defer in.Close()

	// Construct a network that can talk to a drand network.
	// host:
	// "http://pl-us.testnet.drand.sh/"
	// chainHash:
	// "7672797f548f3f4748ac4bf3352fc6c6b6468c9ad40ad456a397545c6e2df5bf"
	host := "http://pl-us.testnet.drand.sh/"
	chainHash := "7672797f548f3f4748ac4bf3352fc6c6b6468c9ad40ad456a397545c6e2df5bf"
	network, err := http.NewNetwork(host, chainHash)

	// Use the network to identify the round number that represents the duration.
	roundNumber := network.RoundNumber(time.Now().Add(duration))
	if err != nil {
		log.Fatalf("round by duration: %s", err)
		return &bytes.Buffer{}, err
	}

	// Write the encrypted file data to this buffer.
	var cipherData bytes.Buffer

	// Encrypt the data for the given round.
	if err := tlock.New(network).Encrypt(&cipherData, bytes.NewBufferString(input), roundNumber); err != nil {
		log.Fatalf("encrypt: %v", err)
		return &bytes.Buffer{}, err
	}

	return &cipherData, nil

}

func decryptData(cipherData *bytes.Buffer) (string, error) {

	// Construct a network that can talk to a drand network.
	// host:      "http://pl-us.testnet.drand.sh/"
	// chainHash: "7672797f548f3f4748ac4bf3352fc6c6b6468c9ad40ad456a397545c6e2df5bf"
	host := "http://pl-us.testnet.drand.sh/"
	chainHash := "7672797f548f3f4748ac4bf3352fc6c6b6468c9ad40ad456a397545c6e2df5bf"
	network, err := http.NewNetwork(host, chainHash)

	if err != nil {
		return "", err
	}

	// Write the decrypted file data to this buffer.
	var plainData bytes.Buffer

	// Decrypt the data. If you try to decrypt the data *before* the specified
	// duration, it will fail with the message: "too early to decrypt".
	if err := tlock.New(network).Decrypt(&plainData, cipherData); err != nil {
		log.Fatalf("decrypt: %v", err)
		return "", err
	}

	// Turn the decrypted data into a string.
	return plainData.String(), nil

}
