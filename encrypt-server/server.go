package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"
)

type EncryptRequest struct {
	Message string `json:"message"`
	// Duration in seconds
	Duration int `json:"duration"`
}

type EncryptedMessage struct {
	Body []byte `json:"body"`
}

type Message struct {
	Body string `json:"body"`
}

func main() {
	http.HandleFunc("/api/encrypt", func(w http.ResponseWriter, r *http.Request) {
		// Get arguments from the POST request
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "Failed to read request body", http.StatusBadRequest)
			return
		}

		var requestBody EncryptRequest
		err = json.Unmarshal(body, &requestBody)
		if err != nil {
			http.Error(w, "Failed to parse request body", http.StatusBadRequest)
			return
		}

		// fmt.Println("Message:", requestBody.Message)
		// fmt.Println("Duration:", requestBody.Duration)

		// Encrypt the message
		encryptedMessage, err := EncryptData(time.Duration(requestBody.Duration), requestBody.Message)
		if err != nil {
			http.Error(w, "Failed to encrypt message", http.StatusInternalServerError)
			return
		}
		// Return the encrypted message
		enc := EncryptedMessage{Body: encryptedMessage.Bytes()}
		json, err := json.Marshal(enc)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write(json)
	})

	http.HandleFunc("/api/decrypt", func(w http.ResponseWriter, r *http.Request) {
		// Get arguments from the POST request
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "Failed to read request body", http.StatusBadRequest)
			return
		}

		var requestBody EncryptedMessage
		err = json.Unmarshal(body, &requestBody)
		if err != nil {
			http.Error(w, "Failed to parse request body", http.StatusBadRequest)
			return
		}

		fmt.Println("Body:", requestBody.Body)
		encMessage := bytes.NewBuffer(requestBody.Body)
		// Encrypt the message
		message, err := DecryptData(encMessage)
		if err != nil {
			http.Error(w, "Failed to decrypt message", http.StatusInternalServerError)
			return
		}

		user := Message{Body: message}
		json, err := json.Marshal(user)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write(json)
	})

	fmt.Println("Listening on port 8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		fmt.Println(err)
	}

}
