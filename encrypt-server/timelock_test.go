package main

import (
	"bytes"
	"testing"
	"time"
)

func TestTLE(t *testing.T) {

	// Specify how long we need to wait before the file can be decrypted.
	duration := 10 * time.Second

	input := "Hello World!"

	cipherData, err := EncryptData(duration, input)
	t.Log(cipherData.Bytes())
	if err != nil {
		t.Fatalf("encryptData: %s", err)
	}
	println("Encrypted Data!")
	strCipher := cipherData.String()
	// Wait for the duration to pass.
	time.Sleep(duration)

	bytesCipher := []byte(strCipher)
	buffer := bytes.NewBuffer(bytesCipher)

	msg, err := DecryptData(buffer)
	if err != nil {
		t.Fatalf("decryptData: %s", err)
	}
	println("Message: " + msg)

}
